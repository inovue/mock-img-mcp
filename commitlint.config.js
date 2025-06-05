export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        '✨ feat',     // New feature
        '🐛 fix',      // Bug fix
        '📚 docs',     // Documentation changes
        '🎨 style',    // Code style changes
        '♻️ refactor', // Code refactoring
        '🧪 test',     // Adding or updating tests
        '🔧 chore',    // Maintenance tasks
        '⚡ perf',     // Performance improvements
        '👷 ci',       // CI/CD changes
        '📦 build',    // Build system changes
        '⏪ revert'    // Reverting previous commits
      ]
    ],
    'type-case': [0], // Disable case checking for emoji
    'type-empty': [2, 'never'],
    'scope-case': [2, 'always', 'lower-case'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'body-leading-blank': [1, 'always'],
    'body-max-line-length': [2, 'always', 100],
    'footer-leading-blank': [1, 'always'],
    'footer-max-line-length': [2, 'always', 100]
  }
};