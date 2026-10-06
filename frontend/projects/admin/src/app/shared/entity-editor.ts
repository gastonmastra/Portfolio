import { inject, signal } from '@angular/core';
import { SchemaOrSchemaFn, form, submit } from '@angular/forms/signals';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminApi, ResourceName, errorMessage } from '../data/admin-api';

interface EditorOptions<TModel, TEntity> {
  resource: ResourceName;
  empty: TModel;
  schema: SchemaOrSchemaFn<TModel>;
  toModel: (entity: TEntity) => TModel;
  toBody: (model: TModel) => unknown;
}

/**
 * Shared create/edit logic for the entity form pages.
 * Must be called from an injection context (e.g. a field initializer).
 */
export function createEntityEditor<TModel, TEntity>(options: EditorOptions<TModel, TEntity>) {
  const api = inject(AdminApi);
  const router = inject(Router);
  const route = inject(ActivatedRoute);
  const model = signal(options.empty);
  const entityForm = form(model, options.schema);
  const loadError = signal<string | null>(null);
  let id: number | undefined;

  return {
    model,
    form: entityForm,
    loadError: loadError.asReadonly(),

    /** Loads the entity to edit; a missing id means "create". */
    async load(rawId: string | undefined): Promise<void> {
      if (!rawId) return;
      id = Number(rawId);
      try {
        model.set(options.toModel(await api.get<TEntity>(options.resource, id)));
      } catch (error) {
        loadError.set(errorMessage(error));
      }
    },

    save(): Promise<boolean> {
      return submit(entityForm, async () => {
        try {
          await api.save(options.resource, options.toBody(model()), id);
          await router.navigate(['..'], { relativeTo: route });
          return null;
        } catch (error) {
          return { kind: 'server', message: errorMessage(error) };
        }
      });
    },
  };
}
