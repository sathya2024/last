import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logout() {
    throw new Error('Method not implemented.');
  }
  private loggedInUser: any = null;

  constructor() {
    // For demo purposes, let's assume we're getting user data from localStorage or a session
    const user = localStorage.getItem('loggedInUser');
    if (user) {
      this.loggedInUser = JSON.parse(user);
    }
  }

  getUserId(): number {
    return this.loggedInUser?.id; 
  }

  setUser(user: any): void {
    this.loggedInUser = user;
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  clearUser(): void {
    this.loggedInUser = null;
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('userId');   // Remove userId
    localStorage.removeItem('authToken'); // Remove authToken
    localStorage.removeItem('isLoggedIn'); // Remove isLoggedIn flag
    localStorage.removeItem('userEmail');  // Remove userEmail
  }
}
