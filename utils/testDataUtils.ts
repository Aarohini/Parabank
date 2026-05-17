import * as fs from 'fs';
import * as path from 'path';


interface BaseUserData {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    ssn: string;
    username: string;
    password: string;
}

export interface RegistrationScenario {
    name: string;
    description: string;
    usernameSuffix: string;
    password: string;
    confirmPassword?: string;
    missingFields?: string[];
    expectSuccess: boolean;
    expectedError?: string;
}

export interface UserRegistrationScenario extends BaseUserData, RegistrationScenario {}

function generateUniqueUsername(suffix: string): string {
    // Create a compact alphanumeric username to avoid UI/database truncation
    const timeFragment = Date.now().toString(36).slice(-4); // recent time portion
    const randFragment = Math.random().toString(36).slice(2, 8); // 6 chars
    const raw = `t${suffix}${timeFragment}${randFragment}`;
    // Keep username to a reasonable length (max 15) and only alphanumeric
    const sanitized = raw.replace(/[^a-zA-Z0-9]/g, '');
    return sanitized.slice(0, 15);
}
function generateRandomPhoneNumber(): string {
    return `98${Math.floor(100000000 + Math.random() * 900000000)}`;
}

function generateRandomSSN(): string {
    return `${Math.floor(100000000 + Math.random() * 900000000)}`;
}

export function getTestScenarios(): UserRegistrationScenario[] {
    const dataPath = path.join(__dirname, '../test-data/userData.json');
    const raw = fs.readFileSync(dataPath, 'utf-8');
    const scenarios = JSON.parse(raw) as UserRegistrationScenario[];

    return scenarios.map((scenario) => {
        const suffix = scenario.usernameSuffix ?? 'case';
        const username = generateUniqueUsername(suffix);
        const userData: any = {
            ...scenario,
            username,
            phoneNumber: generateRandomPhoneNumber(),
            ssn: generateRandomSSN(),
            confirmPassword: scenario.confirmPassword ?? scenario.password
        };

        if (scenario.missingFields) {
            scenario.missingFields.forEach((field) => delete userData[field]);
        }

        return userData as UserRegistrationScenario;
    });
}
