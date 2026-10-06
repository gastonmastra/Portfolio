import { parseCommand } from './commands';

describe('parseCommand', () => {
  it('maps option numbers and aliases to sections', () => {
    expect(parseCommand('1')).toEqual({ kind: 'output', output: 'experience' });
    expect(parseCommand('  Skills ')).toEqual({ kind: 'output', output: 'skills' });
    expect(parseCommand('contact')).toEqual({ kind: 'output', output: 'about' });
  });

  it('recognises help and clear', () => {
    expect(parseCommand('help')).toEqual({ kind: 'output', output: 'help' });
    expect(parseCommand('CLEAR')).toEqual({ kind: 'clear' });
  });

  it('ignores blank input and flags unknown commands', () => {
    expect(parseCommand('   ')).toEqual({ kind: 'noop' });
    expect(parseCommand('rm -rf /')).toEqual({ kind: 'output', output: 'unknown' });
  });
});
