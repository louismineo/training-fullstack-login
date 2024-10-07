/** @type {import('ts-jest').JestConfigWithTsJest} **/

require('dotenv').config();

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',  // Transform TypeScript files using ts-jest
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  setupFiles:['<rootDir>/models/index.js']
};
