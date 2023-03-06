const setCookie = (name, value) => {
    // Set the cookie in the response header
    res.setHeader('Set-Cookie', `${name}=${value}; HttpOnly`);
  };

