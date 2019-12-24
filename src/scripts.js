import './css/base.scss';
import './css/styles.scss';
import $ from 'jquery';


import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';



// import userData from './data/users';
// import activityData from './data/activity';
// import sleepData from './data/sleep';
// import hydrationData from './data/hydration';
//
//
// activityData.forEach(activity => {
//   activity = new Activity(activity, userRepository);
// });
//
// hydrationData.forEach(hydration => {
//   hydration = new Hydration(hydration, userRepository);
// });
//
// sleepData.forEach(sleep => {
//   sleep = new Sleep(sleep, userRepository);
// });
//

let todayDate = "2019/09/22";
let dailyOz = $('.daily-oz');
let dropdownEmail = $('#dropdown-email');
let dropdownFriendsStepsContainer = $('#dropdown-friends-steps-container');
let dropdownGoal = $('#dropdown-goal');
let dropdownName = $('#dropdown-name');
let headerName = $('#header-name');
let hydrationCalendarCard = $('#hydration-calendar-card');
let hydrationFriendOuncesToday = $('#hydration-friend-ounces-today');
let hydrationFriendsCard = $('#hydration-friends-card');
let hydrationInfoCard = $('#hydration-info-card');
let hydrationInfoGlassesToday = $('#hydration-info-glasses-today');
let hydrationMainCard = $('#hydration-main-card');
let hydrationUserOuncesToday = $('#hydration-user-ounces-today');
let sleepCalendarCard = $('#sleep-calendar-card');
let sleepCalendarHoursAverageWeekly = $('#sleep-calendar-hours-average-weekly');
let sleepCalendarQualityAverageWeekly = $('#sleep-calendar-quality-average-weekly');
let sleepFriendLongestSleeper = $('#sleep-friend-longest-sleeper');
let sleepFriendsCard = $('#sleep-friends-card');
let sleepFriendWorstSleeper = $('#sleep-friend-worst-sleeper');
let sleepInfoCard = $('#sleep-info-card');
let sleepInfoHoursAverageAlltime = $('#sleep-info-hours-average-alltime');
let sleepInfoQualityAverageAlltime = $('#sleep-info-quality-average-alltime');
let sleepInfoQualityToday = $('#sleep-info-quality-today');
let sleepMainCard = $('#sleep-main-card');
let sleepUserHoursToday = $('#sleep-user-hours-today');
let stairsCalendarCard = $('#stairs-calendar-card');
let stairsCalendarFlightsAverageWeekly = $('#stairs-calendar-flights-average-weekly');
let stairsCalendarStairsAverageWeekly = $('#stairs-calendar-stairs-average-weekly');
let stepsMainCard = $('#steps-main-card');
let stepsInfoCard = $('#steps-info-card');
let stepsFriendsCard = $('#steps-friends-card');
let stepsTrendingCard = $('#steps-trending-card');
let stepsCalendarCard = $('#steps-calendar-card');
let stairsFriendFlightsAverageToday = $('#stairs-friend-flights-average-today');
let stairsFriendsCard = $('#stairs-friends-card');
let stairsInfoCard = $('#stairs-info-card');
let stairsInfoFlightsToday = $('#stairs-info-flights-today');
let stairsMainCard = $('#stairs-main-card');
let stairsTrendingCard = $('#stairs-trending-card');
let stairsUserStairsToday = $('#stairs-user-stairs-today');
let stepsCalendarTotalActiveMinutesWeekly = $('#steps-calendar-total-active-minutes-weekly');
let stepsCalendarTotalStepsWeekly = $('#steps-calendar-total-steps-weekly');
let stepsFriendAverageStepGoal = $('#steps-friend-average-step-goal');
let stepsInfoActiveMinutesToday = $('#steps-info-active-minutes-today');
let stepsInfoMilesWalkedToday = $('#steps-info-miles-walked-today');
let stepsFriendActiveMinutesAverageToday = $('#steps-friend-active-minutes-average-today');
let stepsFriendStepsAverageToday = $('#steps-friend-steps-average-today');
let stepsUserStepsToday = $('#steps-user-steps-today');
let trendingStepsPhraseContainer = $('.trending-steps-phrase-container');
let trendingStairsPhraseContainer = $('.trending-stairs-phrase-container');
let user;
let userData = [];
let userRepository = new UserRepository();
let userInfoDropdown = $('#user-info-dropdown');

//
// let sortedHydrationDataByDate =
// console.log(user)
// console.log(userRepository.users[0])
// user.ouncesRecord.sort((a, b) => {
//   if (Object.keys(a)[0] > Object.keys(b)[0]) {
//     return -1;
//   }
//   if (Object.keys(a)[0] < Object.keys(b)[0]) {
//     return 1;
//   }
//   return 0;
// });

$('main').click(showInfo);
$('#profile-button').click(showDropdown);
$('.stairs-trending-button').click(updateTrendingStairsDays);
$('.steps-trending-button').click(updateTrendingStepDays);


function getUsers() {
  return fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/users/userData')
    .then(data => data.json())
    .then(data => data.userData)
    .then(userInfo => {
      let userKeys = Object.keys(userInfo)
      userKeys.forEach(key => userData.push(
        userInfo[key]
      ))
    })
    .catch(error => console.log('failure'))
}

let sleepData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData').then(function(response) {
  return response.json()
});

let hydrationData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData').then(function(response) {
  return response.json()
});

let activityData = fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData').then(function(response) {
  return response.json()
})

function getData() {
  return Promise.all([ getUsers(), sleepData, hydrationData, activityData ])
}

getData()
  .then(() => instantiateUsers())

function instantiateUsers() {
  userData.forEach(u => {
    let newUser = new User(u);
    userRepository.users.push(newUser)
  })
  user = userRepository.users[0];
  user.findFriendsNames(userRepository.users);
}


function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

function showDropdown() {
  userInfoDropdown.classList.toggle('hide');
}

function showInfo() {
  if (event.target.classList.contains('steps-info-button')) {
    flipCard(stepsMainCard, stepsInfoCard);
  }
  if (event.target.classList.contains('steps-friends-button')) {
    flipCard(stepsMainCard, stepsFriendsCard);
  }
  if (event.target.classList.contains('steps-trending-button')) {
    flipCard(stepsMainCard, stepsTrendingCard);
  }
  if (event.target.classList.contains('steps-calendar-button')) {
    flipCard(stepsMainCard, stepsCalendarCard);
  }
  if (event.target.classList.contains('hydration-info-button')) {
    flipCard(hydrationMainCard, hydrationInfoCard);
  }
  if (event.target.classList.contains('hydration-friends-button')) {
    flipCard(hydrationMainCard, hydrationFriendsCard);
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    flipCard(hydrationMainCard, hydrationCalendarCard);
  }
  if (event.target.classList.contains('stairs-info-button')) {
    flipCard(stairsMainCard, stairsInfoCard);
  }
  if (event.target.classList.contains('stairs-friends-button')) {
    flipCard(stairsMainCard, stairsFriendsCard);
  }
  if (event.target.classList.contains('stairs-trending-button')) {
    flipCard(stairsMainCard, stairsTrendingCard);
  }
  if (event.target.classList.contains('stairs-calendar-button')) {
    flipCard(stairsMainCard, stairsCalendarCard);
  }
  if (event.target.classList.contains('sleep-info-button')) {
    flipCard(sleepMainCard, sleepInfoCard);
  }
  if (event.target.classList.contains('sleep-friends-button')) {
    flipCard(sleepMainCard, sleepFriendsCard);
  }
  if (event.target.classList.contains('sleep-calendar-button')) {
    flipCard(sleepMainCard, sleepCalendarCard);
  }
  if (event.target.classList.contains('steps-go-back-button')) {
    flipCard(event.target.parentNode, stepsMainCard);
  }
  if (event.target.classList.contains('hydration-go-back-button')) {
    flipCard(event.target.parentNode, hydrationMainCard);
  }
  if (event.target.classList.contains('stairs-go-back-button')) {
    flipCard(event.target.parentNode, stairsMainCard);
  }
  if (event.target.classList.contains('sleep-go-back-button')) {
    flipCard(event.target.parentNode, sleepMainCard);
  }
}

function updateTrendingStairsDays() {
  user.findTrendingStairsDays();
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
}

function updateTrendingStepDays() {
  user.findTrendingStepDays();
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
}

for (var i = 0; i < dailyOz.length; i++) {
  dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
}

dropdownGoal.innerText = `DAILY STEP GOAL | ${user.dailyStepGoal}`;

dropdownEmail.innerText = `EMAIL | ${user.email}`;

dropdownName.innerText = user.name.toUpperCase();

headerName.innerText = `${user.getFirstName()}'S `;

hydrationUserOuncesToday.innerText = hydrationData.find(hydration => {
  return hydration.userID === user.id && hydration.date === todayDate;
}).numOunces;

hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);

hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
  return hydration.userID === user.id && hydration.date === todayDate;
}).numOunces / 8;

sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);

sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);

sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
  return user.id === userRepository.getLongestSleepers(todayDate)
}).getFirstName();

sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
  return user.id === userRepository.getWorstSleepers(todayDate)
}).getFirstName();

sleepInfoHoursAverageAlltime.innerText = user.hoursSleptAverage;

stepsInfoMilesWalkedToday.innerText = user.activityRecord.find(activity => {
  return (activity.date === todayDate && activity.userId === user.id)
}).calculateMiles(userRepository);

sleepInfoQualityAverageAlltime.innerText = user.sleepQualityAverage;

sleepInfoQualityToday.innerText = sleepData.find(sleep => {
  return sleep.userID === user.id && sleep.date === todayDate;
}).sleepQuality;

sleepUserHoursToday.innerText = sleepData.find(sleep => {
  return sleep.userID === user.id && sleep.date === todayDate;
}).hoursSlept;

stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);

stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);

stairsFriendFlightsAverageToday.innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);

stairsInfoFlightsToday.innerText = activityData.find(activity => {
  return activity.userID === user.id && activity.date === todayDate;
}).flightsOfStairs;

stairsUserStairsToday.innerText = activityData.find(activity => {
  return activity.userID === user.id && activity.date === todayDate;
}).flightsOfStairs * 12;

stairsCalendarFlightsAverageWeekly.innerText = user.calculateAverageFlightsThisWeek(todayDate);

stairsCalendarStairsAverageWeekly.innerText = (user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);

stairsTrendingButton.addEventListener('click', function() {
  user.findTrendingStairsDays();
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
});

stepsCalendarTotalActiveMinutesWeekly.innerText = user.calculateAverageMinutesActiveThisWeek(todayDate);

stepsCalendarTotalStepsWeekly.innerText = user.calculateAverageStepsThisWeek(todayDate);

stepsTrendingButton.addEventListener('click', function() {
  user.findTrendingStepDays();
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
});

stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate);

stepsFriendAverageStepGoal.innerText = `${userRepository.calculateAverageStepGoal()}`;

stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);

stepsInfoActiveMinutesToday.innerText = activityData.find(activity => {
  return activity.userID === user.id && activity.date === todayDate;
}).minutesActive;

stepsUserStepsToday.innerText = activityData.find(activity => {
  return activity.userID === user.id && activity.date === todayDate;
}).numSteps;

user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);

user.friendsActivityRecords.forEach(friend => {
  dropdownFriendsStepsContainer.innerHTML += `
  <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
  `;
});

let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');

friendsStepsParagraphs.forEach(paragraph => {
  if (friendsStepsParagraphs[0] === paragraph) {
    paragraph.classList.add('green-text');
  }
  if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
    paragraph.classList.add('red-text');
  }
  if (paragraph.innerText.includes('YOU')) {
    paragraph.classList.add('yellow-text');
  }
});
