
# The Complete Logly Deployment Guide

This guide covers installing the necessary tools and setting up the "Social Sync" database.

## Step 0: Install Git (The Engine)
Git is required to send your code to GitHub.
- **Windows**: Download from [git-scm.com](https://git-scm.com).
- **Mac**: Type `git --version` in Terminal and follow the prompts to install.

## Step 1: Database Setup (Firestore)
To make "Social Syncing" work (so friends see your posts):
1. Go to your [Firebase Console](https://console.firebase.google.com/).
2. Click **Build** > **Firestore Database**.
3. Click **Create Database**.
4. Choose a location and select **"Start in test mode"** (this allows you and your friends to post without complex login rules for the first 30 days).
5. Click **Project Settings** (the gear icon) > **General**.
6. Scroll down to "Your apps" and click the **</> (Web)** icon to register your app.
7. **Copy the `firebaseConfig` object** from the screen. You will need to paste this into `services/firebaseService.ts`.

## Step 2: GitHub Workflow
1. Create a repo on [github.com](https://github.com).
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "First poop app commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/logly.git
   git push -u origin main
   ```

## Step 3: Automatic Deployment
Run:
```bash
firebase init hosting:github
```
Follow the prompts. Now, every time you `git push`, your website updates automatically!

## Alternative: Manual Deploy (No Git Required)
If you don't want to use GitHub/Git at all, you can deploy manually from your terminal:
1. `firebase login`
2. `firebase deploy`
