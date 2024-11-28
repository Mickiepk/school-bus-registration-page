import React, { useState } from 'react';

interface StudentFormData {
  studentId: string;
  firstName: string;
  lastName: string;
  school: string;
  age: number | '';
  address: string;
  homeLocation: string;
  guardianName: string;
  phoneNumber: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<StudentFormData>({
    studentId: '',
    firstName: '',
    lastName: '',
    school: '',
    age: '',
    address: '',
    homeLocation: '',
    guardianName: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'age' ? parseInt(value) || '' : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Registration Successful!');
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="studentId" className="form-label">Student ID</label>
        <input
          type="text"
          id="studentId"
          name="studentId"
          className="form-control"
          value={formData.studentId}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="firstName" className="form-label">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          className="form-control"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="lastName" className="form-label">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          className="form-control"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="school" className="form-label">School</label>
        <input
          type="text"
          id="school"
          name="school"
          className="form-control"
          value={formData.school}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="age" className="form-label">Age</label>
        <input
          type="number"
          id="age"
          name="age"
          className="form-control"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <textarea
          id="address"
          name="address"
          className="form-control"
          value={formData.address}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="homeLocation" className="form-label">Home Location</label>
        <input
          type="text"
          id="homeLocation"
          name="homeLocation"
          className="form-control"
          value={formData.homeLocation}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="guardianName" className="form-label">Guardian Name</label>
        <input
          type="text"
          id="guardianName"
          name="guardianName"
          className="form-control"
          value={formData.guardianName}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          className="form-control"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
};

export default RegistrationForm;