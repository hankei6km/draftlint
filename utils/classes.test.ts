import {
  pruneClasses,
  classNameFromConfigField,
  classNamesFromConfigField
} from './classes';

describe('pruneClassess()', () => {
  it('should prune className that is not exist in classNames array', () => {
    const classes = {
      'ABC-root': 'abc-root',
      'ABC-title': 'abc-title',
      'EFG-root': 'efg-root',
      'EFG-title': 'efg-title'
    };
    const className = ['ABC-root', 'ABC-title'];
    expect(pruneClasses(classes, className)).toStrictEqual({
      'ABC-root': 'abc-root',
      'ABC-title': 'abc-title'
    });
  });
  it('should prune classNames that is not exist in classes object', () => {
    const classes = {
      'ABC-root': 'abc-root',
      'ABC-title': 'abc-title',
      'EFG-root': 'efg-root',
      'EFG-title': 'efg-title'
    };
    const className = ['ABC-root', 'ABC-title', 'HIJ-root'];
    expect(pruneClasses(classes, className)).toStrictEqual({
      'ABC-root': 'abc-root',
      'ABC-title': 'abc-title'
    });
  });
  it('should accespt classes is empty', () => {
    const classes = {};
    const className = ['ABC-root', 'ABC-title'];
    expect(pruneClasses(classes, className)).toStrictEqual({});
  });
  it('should accespt classNames is empty', () => {
    const classes = {
      'ABC-root': 'abc-root',
      'ABC-title': 'abc-title',
      'EFG-root': 'efg-root',
      'EFG-title': 'efg-title'
    };
    const className: string[] = [];
    expect(pruneClasses(classes, className)).toStrictEqual({});
  });
  it('should accespt classes===undefined', () => {
    const className = ['ABC-root', 'ABC-title'];
    expect(pruneClasses(undefined, className)).toStrictEqual({});
  });
});

describe('classNameFromConfigField()', () => {
  it('should return class name', () => {
    expect(
      classNameFromConfigField(
        {
          'ConfigLabel-test1-outer': 'class-000',
          'ConfigLabel-test1': 'class-001',
          profileImage: 'class-002'
        },
        'ConfigLabel-test1'
      )
    ).toStrictEqual('class-001');
  });
  it('should return "" if className is  not contained', () => {
    expect(
      classNameFromConfigField(
        {
          'ConfigLabel-test1-outer': 'class-000',
          'ConfigLabel-test1': 'class-001',
          profileImage: 'class-002'
        },
        'ConfigLabel-test2'
      )
    ).toStrictEqual('');
  });
  it('should return "" if classess = undefined', () => {
    expect(
      classNameFromConfigField(undefined, 'ConfigLabel-test1')
    ).toStrictEqual('');
  });
  it('should return "" if classess = {}', () => {
    expect(classNameFromConfigField({}, 'ConfigLabel-test1')).toStrictEqual('');
  });
});

describe('classNamesFromConfigField()', () => {
  it('should return class names', () => {
    expect(
      classNamesFromConfigField(
        {
          'ConfigLabel-test1-outer': 'class-000',
          'ConfigLabel-test1': 'class-001',
          profileImage: 'class-002'
        },
        'ConfigLabel-test1'
      )
    ).toStrictEqual('class-000 class-001');
  });
  it('should return "" if classNames is  not contained', () => {
    expect(
      classNamesFromConfigField(
        {
          'ConfigLabel-test1-outer': 'class-000',
          'ConfigLabel-test1': 'class-001',
          profileImage: 'class-002'
        },
        'ConfigLabel-test2'
      )
    ).toStrictEqual('');
  });
  it('should return "" if classess = undefined', () => {
    expect(
      classNamesFromConfigField(undefined, 'ConfigLabel-test1')
    ).toStrictEqual('');
  });
  it('should return "" if classess = {}', () => {
    expect(classNamesFromConfigField({}, 'ConfigLabel-test1')).toStrictEqual(
      ''
    );
  });
});
