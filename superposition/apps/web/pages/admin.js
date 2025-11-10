import React from 'react';
import SlackWidget from '../components/SlackWidget';

export default function Admin() {
  return (
    <div className="admin-container">
      <header>Admin Panel</header>
      <main>
        <SlackWidget channel="#dev-log" />
      </main>
      <aside>
        <h2>Slack Commands</h2>
        <p>Use /generate_ai_art in Slack to trigger AI art generation.</p>
      </aside>
    </div>
  );
}
