const emailValidator = (email) => {
  if (typeof email !== "string" || !email.includes("@")) {
    return false;
  }

  const parts = email.split("@");
  if (parts.length !== 2) {
    return false;
  }

  // Local part (before @)
  if (!/^[A-Za-z0-9._%+-]+$/.test(parts[0])) {
    return false;
  }

  // Domain part (after @)
  if (!/^[A-Za-z0-9.-]+$/.test(parts[1])) {
    return false;
  }

  const domain = parts[1].split(".");
  const tld = domain[domain.length - 1];

  if (!["com", "org", "net"].includes(tld)) {
    return false;
  }
  return true;
};

export default emailValidator;
