<template>
<div class="space-y-3">
  <h2 class="text-lg font-semibold text-slate-300">Current Ticket</h2>
  <div class="bg-gradient-to-br from-slate-700/60 to-slate-800/60 border border-slate-600 rounded-xl p-6 backdrop-blur">
    <div class="space-y-3">
      <div class="flex items-start gap-3">
        <div>
          <a href="google.com" class="text-xs text-cyan-400">JIRA-1234</a>
          <h3 class="text-xl font-bold mt-1">Implement user authentication</h3>
        </div>
      </div>
      <p class="text-slate-300 text-sm leading-relaxed">
        Add OAuth2 integration and user login flow for the application. Should include password reset and MFA support.
      </p>
      <div class="flex gap-2 pt-2">
        <span class="px-2 py-1 bg-blue-500/20 border border-blue-500 text-blue-300 text-xs rounded">Feature</span>
        <span class="px-2 py-1 bg-purple-500/20 border border-purple-500 text-purple-300 text-xs rounded">High Priority</span>
      </div>
    </div>
  </div>
</div>
</template>
