import React, { useState } from 'react';

const HouseDetails = () => {
  // Initial house details
  const initialHouseDetails = {
    name: 'St. George\'s House',
    houseMaster: 'Mr. Smith',
    students: 120,
    achievements: [
      'Won the inter-house sports competition 2023',
      'Best house in academics 2022',
    ],
  };

  const [houseDetails, setHouseDetails] = useState(initialHouseDetails);
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(houseDetails.name);
  const [editedHouseMaster, setEditedHouseMaster] = useState(houseDetails.houseMaster);
  const [editedStudents, setEditedStudents] = useState(houseDetails.students);
  const [newAchievement, setNewAchievement] = useState('');

  // Function to handle input change for new achievement
  const handleInputChange = (e) => {
    setNewAchievement(e.target.value);
  };

  // Function to add a new achievement
  const addAchievement = () => {
    if (newAchievement.trim() !== '') {
      setHouseDetails({
        ...houseDetails,
        achievements: [...houseDetails.achievements, newAchievement]
      });
      setNewAchievement('');
    }
  };

  // Function to handle editing house details
  const handleEdit = () => {
    setEditMode(true);
  };

  // Function to handle saving edited house details
  const handleSave = () => {
    setHouseDetails({
      name: editedName,
      houseMaster: editedHouseMaster,
      students: editedStudents,
      achievements: houseDetails.achievements
    });
    setEditMode(false);
  };

  // Function to handle deleting an achievement
  const deleteAchievement = (index) => {
    const updatedAchievements = [...houseDetails.achievements];
    updatedAchievements.splice(index, 1);
    setHouseDetails({
      ...houseDetails,
      achievements: updatedAchievements
    });
  };

  return (
    <div>
      {editMode ? (
        <div>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
          <input
            type="text"
            value={editedHouseMaster}
            onChange={(e) => setEditedHouseMaster(e.target.value)}
          />
          <input
            type="number"
            value={editedStudents}
            onChange={(e) => setEditedStudents(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      ) : (
        <div>
          <h3>{houseDetails.name}</h3>
          <p>House Master: {houseDetails.houseMaster}</p>
          <p>Number of Students: {houseDetails.students}</p>
          <h4>Achievements:</h4>
          <ul>
            {houseDetails.achievements.map((achievement, index) => (
              <li key={index}>
                {achievement}
                <button onClick={() => deleteAchievement(index)}>Delete</button>
              </li>
            ))}
          </ul>
          <div>
            <input
              type="text"
              value={newAchievement}
              onChange={handleInputChange}
              placeholder="Enter new achievement"
            />
            <button onClick={addAchievement}>Add Achievement</button>
            <button onClick={handleEdit}>Edit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HouseDetails;
