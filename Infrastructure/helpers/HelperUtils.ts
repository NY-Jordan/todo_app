

export async function   getBearerAuthToken () {
    const token = await  localStorage.getItem('token');
    return `Bearer ${token}`
}