export default function HomePage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontFamily: 'sans-serif',
      backgroundColor: '#f9fafb',
      padding: '20px'
    }}>
      <div style={{
        textAlign: 'center',
        padding: '40px',
        border: '1px solid #e5e7eb',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)'
      }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#111827' }}>
          Welcome to Engineered Success Sales
        </h1>
        <p style={{ marginTop: '1rem', fontSize: '1.125rem', color: '#4b5563' }}>
          To begin your assessment, please proceed to our checkup page.
        </p>
        <a href="/quiz" style={{
          display: 'inline-block',
          marginTop: '2rem',
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: '600',
          color: 'white',
          backgroundColor: '#2563eb',
          borderRadius: '6px',
          textDecoration: 'none',
          transition: 'background-color 0.2s'
        }}>
          Start My Free Checkup
        </a>
      </div>
    </div>
  );
}
