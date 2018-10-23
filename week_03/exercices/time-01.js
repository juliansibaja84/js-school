/**
 * Display a timer in the console with the specified Time t
 */
const countDown = function (t) {
  let lastTime = new Date();
  let lock = true;
  
  // Time array with idx0 = hours, idx1 = minutes, idx2 = seconds
  let dT = [0,0,0];

  // Strings Array for formmating the time.
  let sTime = ['','',''];

  //  set dT using the dT passed -------------------------------  
  if (t > 3600) {
    dT[0] = Math.floor(t/3600);
    dT[1] = Math.floor((t%3600)/60);
    dT[2] = (t%3600)%60;
  } else if (t > 59) {
    dT[1] = Math.floor(t/60);
    dT[2] = Math.floor(t%60);
  } else {
    dT[2] = t;
  }

  // Start Timer
  while(lock){
    // Timer Logic
    let now = new Date();
    if (Math.abs(lastTime.getSeconds()) - Math.abs(now.getSeconds()) !== 0) {
      if (dT[2] === 0 && (dT[1] > 0 || dT[0] > 0)) {
        dT[2] = 59;
      } else {
        dT[2] -= 1;
      }
      if (dT[2] === 59) {
        if (dT[1] === 0 && dT[0] > 0) {
          dT[1] = 59;
        } else {
          dT[1] -= 1;
        }
      }
      if (dT[1] === 59 && dT[2] === 59) {
        dT[0] -= 1
      }
      lastTime = now;
    }

    // Format an dislay the time
    if (lastTime === now) {
      // Format
      for (let i = 0; i < 3; i++) {
        if ( dT[i]/10 < 1) {
          sTime[i] = `0${dT[i]}`;
        } else {
          sTime[i] = `${dT[i]}`;
        }
      }
      console.clear();
      console.log(`Time left = ${sTime[0]}:${sTime[1]}:${sTime[2]}`);
    }

    // Verify if the left time is 0
    if (dT[2] === 0 && dT[1] === 0 && dT[0] === 0) {
      lock = false;
      console.log('Done!');
    }
  }
};

/**
 * Callback function, it gets the time parameter from the html
 */
const counterFunctionCaller = function () {
  let time = document.getElementById('counter').value;
  if (!time) {
      time = 300;
  }

  countDown(time);
};

// countDown(300);

