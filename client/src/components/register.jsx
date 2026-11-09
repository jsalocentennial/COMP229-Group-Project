import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../style/register.css'

const Register = ({ onAuth }) => {
    const [form, setForm] = useState({ username: '', email: '', password: '' })
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)
    const navigate = useNavigate()

    const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
        const response = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
        })
        const data = await response.json()
        if (!response.ok) throw new Error(data.message || 'Failed to register')
        onAuth(data.token)
        navigate('/')
    } catch (error) {
        setError(error.message)
    } finally {
        setSaving(false)
    }
    }

    return (
        <div className="register-container">
            <h1 className="layout-title">Register</h1>

            <form onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="username" className="layout-title">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="layout-title">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password" className="layout-title">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        autoComplete="new-password"
                        required
                    />
                </div>

                {error && <p className="error-message">{error}</p>}

                <button type="submit" disabled={saving}>
                    {saving ? 'Please wait...' : 'Register'}
                </button>

            </form>
        </div>
    );
}

export default Register
