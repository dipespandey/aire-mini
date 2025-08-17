import React from 'react'
export default function Newsletter() {
  return (
    <div className="prose max-w-none">
      <h2>Newsletter</h2>
      <p>Plug in your provider (Buttondown, Mailchimp, ConvertKit). For now this is a lightweight placeholder with a form.</p>
      <form onSubmit={(e)=>{e.preventDefault(); alert('Thanks!')}} className="max-w-md flex gap-2">
        <input className="border rounded px-3 py-2 w-full" type="email" placeholder="you@example.com" required/>
        <button className="btn" type="submit">Subscribe</button>
      </form>
    </div>
  )
}
