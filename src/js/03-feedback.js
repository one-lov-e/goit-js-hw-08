import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};
const refs = {
  form: document.querySelector('.feedback-form'),
  textarea: document.querySelector('.feedback-form textarea'),
  input: document.querySelector('.feedback-form input'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormDataInput, 1000));
populateFormData();

function onFormSubmit(evt) {
  evt.preventDefault();
  if (!formData[refs.input.name] || !formData[refs.textarea.name]) {
    alert('enter the text');
  } else {
    console.log(formData);
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    formData[refs.input.name] = '';
    formData[refs.textarea.name] = '';
  }
}

function onFormDataInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(savedData);
  if (savedData) {
    if (parsedData.email) {
      refs.input.value = parsedData.email;
      formData[refs.input.name] = parsedData.email;
    }

    if (parsedData.message) {
      refs.textarea.value = parsedData.message;
      formData[refs.textarea.name] = parsedData.message;
    }
  }
}
