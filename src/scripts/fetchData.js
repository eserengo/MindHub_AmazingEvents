// --> comienzo del script

const fetchData = async () => {
  try {
    const res = await fetch("https://mindhub-xj03.onrender.com/api/amazing");
    if (res.ok) {
      const json = await res.json();
      return json;
    }
    throw new Error(res.status);
  } catch (err) {
    return { error: err.message };
  }
}

const data = await fetchData();

export default data;

// --> fin del script
