import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const DATA_DIR = join(__dirname, "data");
const USERS_FILE = join(DATA_DIR, "users.json");

// Ensure data directory exists
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

function loadUsers() {
  try {
    if (existsSync(USERS_FILE)) {
      const data = readFileSync(USERS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Failed to load users:', error);
  }
  return [];
}

function saveUsers(users) {
  try {
    writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Failed to save users:', error);
  }
}

function createAdminUser() {
  const users = loadUsers();
  
  // Check if admin already exists
  const existingAdmin = users.find(user => user.email === 'admin@poorvam.care');
  if (existingAdmin) {
    console.log('✅ Admin user already exists!');
    console.log('Email: admin@poorvam.care');
    console.log('Password: admin123');
    return;
  }

  // Create new admin user
  const adminUser = {
    id: Math.max(1, ...users.map(u => u.id), 0) + 1,
    email: 'admin@poorvam.care',
    password: 'admin123',
    role: 'employee',
    firstName: 'Admin',
    lastName: 'User',
    createdAt: new Date().toISOString()
  };

  users.push(adminUser);
  saveUsers(users);

  console.log('✅ Admin user created successfully!');
  console.log('Email: admin@poorvam.care');
  console.log('Password: admin123');
  console.log('\nYou can now access the admin panel at: http://localhost:5173/admin');
}

createAdminUser(); 