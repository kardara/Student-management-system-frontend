import React, { useEffect } from 'react'
import api from '../../services/apiClient';
import { useNavigate } from 'react-router-dom';

export default function OauthRedirect() {
 const navigate = useNavigate();

  return <div>Loading user info...</div>;
}
