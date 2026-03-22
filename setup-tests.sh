#!/bin/bash
set -e

echo "Setting up Backend Testing..."
cd /Users/eduardocruz/univet/backend
npm install -y -D jest ts-jest @types/jest
cat << 'EOF' > jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
};
EOF

mkdir -p src/__tests__/domain
cat << 'EOF' > src/__tests__/domain/Pet.spec.ts
import { Pet } from '../../domain/entities/Pet';

describe('Pet Entity', () => {
  it('should calculate age correctly', () => {
    const today = new Date();
    const twoYearsAgo = new Date(today.getFullYear() - 2, today.getMonth(), today.getDate());
    const pet = new Pet('id1', 'Rex', 'dog', 'Poodle', twoYearsAgo, 'tutor1');
    expect(pet.ageInYears).toBeGreaterThanOrEqual(2);
  });
});
EOF
npm test

echo "Setting up Mobile Testing..."
cd /Users/eduardocruz/univet/mobile
npm install -y -D jest jest-expo @testing-library/react-native
cat << 'EOF' > jest.config.js
module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)'
  ]
};
EOF

mkdir -p src/__tests__/utils
cat << 'EOF' > src/__tests__/utils/currency.spec.ts
import { formatBRL } from '../../utils/currency';
describe('formatBRL', () => {
  it('should format correctly', () => {
    expect(formatBRL(150)).toBe('R$ 150,00');
  });
});
EOF

cat << 'EOF' > src/__tests__/utils/date.spec.ts
import { formatDate } from '../../utils/date';
describe('formatDate', () => {
  it('should format date', () => {
    const d = new Date('2026-07-10T00:00:00');
    expect(formatDate(d)).toBe('10/07/2026');
  });
});
EOF
npm test
