import React, { useState } from 'react'
import LoginModal from './LoginModal'
import logo from '../assets/logo.png'
import MenuModal from './MenuModal'

const TopNavbar = () => {
  const locations = ["დიდუბე", "წყალსადენი", "გლდანი", "ბათუმი(საკონსერვო)", "ბათუმი (დე-ეს-კა)", "თელავი", "ქუთაისი", "საბურთალო", "რუსთავი", "ლილო", "გორი", "ვაკე"]
  const [selectedLocation, setSelectedLocation] = useState(locations[0])
  // Simulate authentication state and later connect it to backend
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [registerOpen, setRegisterOpen] = useState(false)
  const [registerEmail, setRegisterEmail] = useState("")
  const [registerPassword, setRegisterPassword] = useState("")

  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    // TODO: Replace with real registration logic (backend API call)

    console.log("User logged in with:", registerEmail, registerPassword)

    setRegisterOpen(false)
    setRegisterEmail("")
    setRegisterPassword("")
    setIsLoggedIn(true) 
  }

  return (
      <div
        style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: 'center',
            alignItems: "center",
            gap: "4px",
            flexWrap: "wrap",
            backgroundColor: "#edf2f7",
            padding: "10px 20px",
            position: 'relative',
          }}
          className='shadow-md p-4 rounded-lg text-gray-700'
        >
            <div style={{ position: 'absolute', top: '10px', left: '10px', padding: '5px' }}>
                <img src={logo} alt="Logo" style={{ height: '40px', width: 'auto', translateY: '-50%' }} />
            </div>
            <div style={{width: '10%'}}></div>
        {locations.map((location) => (
        <button
            key={location}
            onClick={() => setSelectedLocation(location)}
            style={{
            padding: "10px 20px",
            backgroundColor: "transparent",
            color:
                selectedLocation === location ? "#017dbe" : "#2d3748",
            border:
                selectedLocation === location
                ? "2px solid #017dbe"
                : "2px solid transparent",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "color 0.2s, border 0.2s",
            }}
        >
            {location}
        </button>
        ))}
        <div style={{width: '10%'}}>
            {!isLoggedIn ? (
              <button
                onClick={() => setRegisterOpen(true)}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#017dbe",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    position: 'absolute',
                    right: '2rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                }}
                >
                ავტორიზაცია
            </button>
            ) : (
              <MenuModal />
            )}
        </div>

        <LoginModal
            open={registerOpen}
            onClose={() => setRegisterOpen(false)}
            onSubmit={handleRegisterSubmit}
            email={registerEmail}
            setEmail={setRegisterEmail}
            password={registerPassword}
            setPassword={setRegisterPassword}
        />
    </div>
  )
}

export default TopNavbar