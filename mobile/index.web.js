// Web entry point — @expo/metro-runtime must be the very first import on web
// to install fetch polyfills and window.location before the app initialises.
// On native we skip this (index.js is used instead) because it corrupts
// Firebase Auth's initialization environment.
import '@expo/metro-runtime';
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
