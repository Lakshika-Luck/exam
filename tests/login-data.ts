import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface LoginScenario {
  id: string;
  username: string;
  password: string;
  expectedResult: string;
}

function isLoginScenario(value: unknown): value is LoginScenario {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const scenario = value as Record<string, unknown>;
  return (
    typeof scenario.id === 'string' &&
    typeof scenario.username === 'string' &&
    typeof scenario.password === 'string' &&
    typeof scenario.expectedResult === 'string'
  );
}

function assertLoginScenarios(value: unknown): asserts value is LoginScenario[] {
  if (!Array.isArray(value) || !value.every(isLoginScenario)) {
    throw new Error('Login data must be a JSON array of scenarios with id, username, password, and expectedResult.');
  }
}

const parsedLoginData: unknown = JSON.parse(
  readFileSync(join(__dirname, 'data', 'login-data.json'), 'utf8'),
);
assertLoginScenarios(parsedLoginData);

export const loginScenarios = parsedLoginData;

export function getLoginData(id: string): LoginScenario {
  const scenario = loginScenarios.find((item) => item.id === id);
  if (!scenario) {
    throw new Error(`No login data found for scenario "${id}".`);
  }

  return scenario;
}
