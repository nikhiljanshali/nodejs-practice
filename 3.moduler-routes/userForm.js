function userForm(req, res) {
  res.write(`
        <form action="/submit" method="POST">

            <div class="form-group">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" placeholder="Enter first name" required>
            </div>

            <div class="form-group">
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" placeholder="Enter last name" required>
            </div>

            <div class="form-group">
                <label for="age">Age:</label>
                <input type="number" id="age" name="age" placeholder="Enter age" min="1" max="120" required>
            </div>

            <div class="form-group">
                <label>Gender:</label>
                <div class="gender-group">
                    <input type="radio" id="male" name="gender" value="Male" required>
                    <label for="male">Male</label>
                    <input type="radio" id="female" name="gender" value="Female">
                    <label for="female">Female</label>
                    <input type="radio" id="other" name="gender" value="Other">
                    <label for="other">Other</label>
                </div>
            </div>

            <div class="form-group">
                <label for="email">Email Address:</label>
                <input type="email" id="email" name="email" placeholder="Enter professional email address" required>
            </div>

            <div class="form-group">
                <label for="phoneNumber">Phone Number:</label>
                <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="e.g., (555) 555-5555">
            </div>

            <div class="form-group">
                <label for="address">Full Address:</label>
                <textarea id="address" name="address" rows="3" placeholder="Enter full mailing address"
                    required></textarea>
            </div>

            <div class="form-group">
                <label for="occupation">Occupation/Role:</label>
                <input type="text" id="occupation" name="occupation" placeholder="Enter current occupation or role">
            </div>

            <button type="submit">Submit Details</button>
        </form>
        `);
}

module.exports = userForm;
