import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Service, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import type { Profile } from '@shared/models';

export const API = 'api';

export type ResourceName = 'skills' | 'experiences' | 'studies' | 'projects';

/** Write access to the internal admin API. Lists are read with `httpResource` in the pages. */
@Service()
export class AdminApi {
  private readonly http = inject(HttpClient);

  get<T>(resource: ResourceName, id: number): Promise<T> {
    return firstValueFrom(this.http.get<T>(`${API}/${resource}/${id}`));
  }

  /** Creates the entity, or replaces it when an id is given. */
  save<T>(resource: ResourceName, body: unknown, id?: number): Promise<T> {
    const request = id
      ? this.http.put<T>(`${API}/${resource}/${id}`, body)
      : this.http.post<T>(`${API}/${resource}`, body);
    return firstValueFrom(request);
  }

  remove(resource: ResourceName, id: number): Promise<void> {
    return firstValueFrom(this.http.delete<void>(`${API}/${resource}/${id}`));
  }

  getProfile(): Promise<Profile | null> {
    return firstValueFrom(this.http.get<Profile | null>(`${API}/profile`));
  }

  saveProfile(profile: Profile): Promise<Profile> {
    return firstValueFrom(this.http.put<Profile>(`${API}/profile`, profile));
  }
}

/** Extracts a readable message from a failed API call (NestJS error format). */
export function errorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) return 'Could not reach the admin API. Is it running?';
    const message: unknown = error.error?.message;
    if (Array.isArray(message)) return message.join('. ');
    if (typeof message === 'string') return message;
  }
  return 'Unexpected error, please try again.';
}
