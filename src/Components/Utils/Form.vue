<template>
  <body>
  <h1>Contact Me:</h1>
  <div class="fullForm">
    <form
        class="form"
        target="_blank"
        action="https://formspree.io/f/mgejpwed"
        method="POST"
    >
      <div class="formEl">
        <label for="name">Name:</label>
        <input type="text" name="name" placeholder="Name:" required />
      </div>

      <div class="formEl">
        <label for="email">E-mail:</label>
        <input type="email" name="email" placeholder="E-mail:" required />
      </div>

      <div class="formEl">
        <label for="reason">Subject:</label><br />
        <select name="reason" required>
          <option value="jobOpportunity">Job Opportunity</option>
          <option value="moreInformation">More Information</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="formEl">
        <label for="text Area">Message:</label>
        <textarea
            placeholder="Leave me a message."
            name="message"
            rows="8"
            required
        ></textarea>
      </div>

      <button type="submit" class="btn">Submit</button>
    </form>
  </div>
  </body>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Mooli&display=swap");

body {
  background-color: black;
  color: white;
  border: 40px solid silver;
  border-radius: 25px;
  width: 100%vw;
  height: 100%vh;
  font-family: "Mooli", sans-serif;
  margin: 15px;
}

.fullForm {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  flex-direction: center;
}

.formEl {
  padding: 10px;
  align-items: center;
}

h1 {
  font-size: 50px;
  color: whitesmoke;

  display: flex;
  align-items: center;
  justify-content: center;
}
input,
select,
textarea {
  border-radius: 15px;
  width: 500px;
  height: 50px;
  background-color: rgb(184, 180, 180);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn {
  background-color: olivedrab;
  font-family: "Ubuntu", sans-serif;
  color: whitesmoke;
  padding: 30px;
  margin: 30px;
}

.btn:hover {
  cursor: pointer;
  background-color: green;
}

label {
  text-align: left;
  padding: 10px;
}

@media only screen and (max-width: 550px) {
  body {
    border: 10px solid silver;
  }

  input,
  select,
  textarea {
    width: 200px;
    height: 50px;
  }

  h1 {
    font-size: 30px;
  }
}

</style>
<script setup lang="ts">
</script>