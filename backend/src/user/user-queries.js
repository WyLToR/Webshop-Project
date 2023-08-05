export const createUserQuery = 'INSERT INTO users (id, email, password, first_name, last_name) values ($1, $2, $3, $4, $5)';
export const readUserByIdQuery = `
SELECT id, email, first_name, last_name, postcode, state, city, street, house_number, is_admin, created 
    FROM users 
    WHERE id=$1 AND is_deleted_user IS false 
`;
export const readUserByEmailQuery = 'SELECT * FROM users WHERE email=$1 AND is_deleted_user IS false';
export const updateUserBaseDataQuery = `
    UPDATE users 
    SET email=$1, first_name=$2, last_name=$3 
    WHERE id=$4
    RETURNING id, email, first_name, last_name
    `;
export const changeUserPasswordQuery = `
    UPDATE users
    SET password=$1
    WHERE id=$2
`;
export const deactivateUserQuery = 'UPDATE users SET is_deleted_user=true WHERE id=$1';
export const createUserOrderDataQuery = `
    UPDATE users SET postcode=$1, state=$2, city=$3, street=$4, house_number=$5 
    WHERE id=$6
    RETURNING id, postcode, state, city, street, house_number
    `;
export const readAllUsersQuery = `SELECT * FROM users 
    WHERE 
    ($1::varchar IS NULL 
        OR users.email ILIKE $1
        OR users.first_name ILIKE $1
        OR users.last_name ILIKE $1
        OR users.postcode ILIKE $1
        OR users.state ILIKE $1
        OR users.city ILIKE $1
        OR users.street ILIKE $1
        OR users.house_number ILIKE $1)
        GROUP BY users.id, users.email`;
export const getUsersRowsTotal = `SELECT COUNT(*) AS total
    FROM (
        SELECT * FROM users 
        WHERE 
        ($1::varchar IS NULL 
            OR users.email ILIKE $1
            OR users.first_name ILIKE $1
            OR users.last_name ILIKE $1
            OR users.postcode ILIKE $1
            OR users.state ILIKE $1
            OR users.city ILIKE $1
            OR users.street ILIKE $1
            OR users.house_number ILIKE $1)
            GROUP BY users.id, users.email
    ) allusers;`;
export const getUserByEmailAndPassword = 'SELECT email, password FROM users WHERE email=$1, password=$2 AND is_deleted_user=FALSE';
export const updateUserAdminPermission = 'UPDATE users SET is_admin=$1 WHERE id=$2';
export const activateUser = 'UPDATE users SET is_activated=true WHERE id=$1';
export const getUserIdByEmail = 'SELECT id, first_name, last_name FROM users WHERE email=$1';
