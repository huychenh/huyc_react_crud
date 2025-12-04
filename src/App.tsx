import reactLogo from './assets/react.svg'
import './App.css'
import UserList from './components/users/UserList'
import UserUpdate from './components/users/UserUpdate'
import UserDelete from './components/users/UserDelete'
import UserAdd from './components/users/UserAdd'
import { useState } from 'react'
import UserDetail from './components/users/UserDetail'

function App() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleViewUser = (userId: number) => {
    setSelectedUserId(userId);
    setShowDetailModal(true);
  };

  const handleEditUser = (userId: number) => {
    setSelectedUserId(userId);
    setShowUpdateModal(true);
  };

  const handleDeleteUser = (userId: number) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };


  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Simple CRUD React</h1>
      </div>

      <div className="header-container">
        <h2>User List</h2>
        <button className="add-user-button" onClick={() => setShowAddModal(true)}>
          Add New User
        </button>
      </div>

      {/* List */}
      <UserList
        onViewUser={handleViewUser}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />

      {/* Detail */}
      {showDetailModal && selectedUserId && (
        <UserDetail
          userId={selectedUserId}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {/* Add */}
      {showAddModal && <UserAdd onClose={() => setShowAddModal(false)} />}

      {/* Update */}
      {showUpdateModal && selectedUserId && (
        <UserUpdate
          userId={selectedUserId}
          onClose={() => setShowUpdateModal(false)}
        />
      )}

      {/* Delete */}
      {showDeleteModal && selectedUserId && (
        <UserDelete
          userId={selectedUserId}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  )
}

export default App;
