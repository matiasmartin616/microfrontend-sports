import Header from '../components/Header';

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
}
