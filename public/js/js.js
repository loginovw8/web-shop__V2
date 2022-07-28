

const toggleButton = document.querySelector('.dark-light');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  
});




const tovar = document.getElementById('tovar');

tovar.addEventListener('click', () => {
  if (  document.getElementById('elem').style.width =='18%') {
    document.getElementById('elem').style.width = '0%';
    document.getElementById('elem').style.padding = '0px';
  }
  else{
  document.getElementById('elem').style.width = '18%';
  document.getElementById('elem').style.padding = '26px';
  }
  });