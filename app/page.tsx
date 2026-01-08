import { AppProvider } from './components/AppProvider';
import { ClientPilot } from './components/ClientPilot';

export default function Home() {
  return (
    <AppProvider>
      <ClientPilot />
    </AppProvider>
  );
}