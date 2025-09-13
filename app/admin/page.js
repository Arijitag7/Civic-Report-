'use client'
import { useEffect, useState } from 'react'
import ReportCard from '../../components/ReportCard'

export default function AdminPage(){
  const [reports, setReports] = useState([])
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const u = JSON.parse(localStorage.getItem('currentUser') || 'null')
    setUser(u)
    const all = JSON.parse(localStorage.getItem('reports') || '[]')
    setReports(all)
  },[])

  const updateStatus = (id, status) => {
    const all = JSON.parse(localStorage.getItem('reports') || '[]')
    const updated = all.map(r => r.id === id ? {...r, status} : r)
    localStorage.setItem('reports', JSON.stringify(updated))
    setReports(updated)
  }

  if(!user || user.role !== 'admin'){
    return <div className="max-w-md mx-auto p-6 bg-white rounded shadow">Admin access only. Please <a className="text-blue-600" href="/login">login</a> as admin.</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Admin Panel</h1>
      <p className="mb-4 text-sm text-gray-600">Update status of reports below.</p>
      <div className="grid gap-4">
        {reports.map(r => (
          <div key={r.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{r.title}</h3>
                <p className="text-sm text-gray-600">{r.description}</p>
                <p className="text-xs text-gray-500">By: {r.userId}</p>
              </div>
              <div className="flex flex-col gap-2">
                <select value={r.status} onChange={(e)=>updateStatus(r.id, e.target.value)} className="p-1 border rounded">
                  <option>Submitted</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>
                <p className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleString()}</p>
              </div>
            </div>
            {r.media && <div className="mt-3"><img src={r.media} alt="media" className="max-h-40 rounded"/></div>}
          </div>
        ))}
        {reports.length === 0 && <p className="text-gray-600">No reports yet.</p>}
      </div>
    </div>
  )
}
