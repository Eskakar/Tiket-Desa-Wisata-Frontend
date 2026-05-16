import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // Membelah JWT dan mengambil Payload (bagian ke-2)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const payload = JSON.parse(jsonPayload);
    
    // Mengambil nilai "role" dari payload (berdasarkan struktur token Golang)
    const userRole = payload.role; 

    // Jika parameter allowedRoles diberikan, dan role user TIDAK ada di dalamnya, tolak!
    if (allowedRoles && !allowedRoles.includes(userRole)) {
      localStorage.removeItem('adminToken');
      return <Navigate to="/login" replace />;
    }

  } catch (error) {
    // Jika token gagal di-parse (rusak/manipulasi), hapus dan tolak
    localStorage.removeItem('adminToken');
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default ProtectedRoute;