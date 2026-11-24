function Header({ token, onSetToken, onSetEmail }) {
  const handleLogout = async () => {
    try {
      await fetch('/api/users/logoff', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'X-CSRF-TOKEN': token,
        },
      });
    } catch (error) {
      console.error('Logout failed:', error);
    }

    onSetToken('');
    onSetEmail('');
  };

  return (
    <header>
      <h1>Todo App</h1>
      {token && (
        <button type="button" onClick={handleLogout}>
          Log Out
        </button>
      )}
    </header>
  );
}

export default Header;
