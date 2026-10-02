// src/hooks/useAuth.js
// Single source of truth: re-export the context hook.
// (Previously this file duplicated AuthContext with its own state,
//  so AppRouter and Login disagreed about who was logged in.)
export { useAuth } from '../context/AuthContext'
