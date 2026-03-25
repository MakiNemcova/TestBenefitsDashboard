function getTimestamp() {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

function createEmployeeData(overrides = {}) {
  const timestamp = getTimestamp();

  return {
    firstName: `${overrides.firstName || 'Test'}_${timestamp}`,
    lastName: `${overrides.lastName || 'User'}_${timestamp}`,
    dependents: overrides.dependents || '1',
  };
}

module.exports = { getTimestamp, createEmployeeData }