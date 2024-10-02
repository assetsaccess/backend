// js/rbac.js
const roles = {
    admin: ['readAny', 'writeAny'],
    user: ['readOwn', 'writeOwn']
};

module.exports = roles;
