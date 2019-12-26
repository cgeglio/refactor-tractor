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
let hydrationCalendarCard = $('#hydration-calendar-card');
let hydrationFriendsCard = $('#hydration-friends-card');
let hydrationInfoCard = $('#hydration-info-card');
let hydrationMainCard = $('#hydration-main-card');
let sleepCalendarCard = $('#sleep-calendar-card');
let sleepFriendsCard = $('#sleep-friends-card');
let sleepInfoCard = $('#sleep-info-card');
let sleepMainCard = $('#sleep-main-card');
let stairsCalendarCard = $('#stairs-calendar-card');
let stepsMainCard = $('#steps-main-card');
let stepsInfoCard = $('#steps-info-card');
let stepsFriendsCard = $('#steps-friends-card');
let stepsTrendingCard = $('#steps-trending-card');
let stepsCalendarCard = $('#steps-calendar-card');
let stairsFriendsCard = $('#stairs-friends-card');
let stairsInfoCard = $('#stairs-info-card');
let stairsMainCard = $('#stairs-main-card');
let stairsTrendingCard = $('#stairs-trending-card');
let user;
let userData = [];
let userRepository = new UserRepository();

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

stepsTrendingButton.addEventListener('click', function() {
  user.findTrendingStepDays();
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStepDays[0]}</p>`;
});

stairsTrendingButton.addEventListener('click', function() {
  user.findTrendingStairsDays();
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${user.trendingStairsDays[0]}</p>`;
});

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
  $('.trending-stairs-phrase-container').html(`<p class='trend-line'>${user.trendingStairsDays[0]}</p>`);
}

function updateTrendingStepDays() {
  user.findTrendingStepDays();
  $('.trending-steps-phrase-container').html(`<p class='trend-line'>${user.trendingStepDays[0]}</p>`);
}

for (var i = 0; i < dailyOz.length; i++) {
  dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
}

$('#dropdown-goal').text(`DAILY STEP GOAL | ${user.dailyStepGoal}`);

$('#dropdown-email').text(`EMAIL | ${user.email}`);

$('#dropdown-name').text(`${user.name.toUpperCase()}`);

$('#header-name').text(`${user.getFirstName()}'S `)

$('#hydration-user-ounces-today').text(hydrationData.find(hydration => {
  return hydration.userID === user.id && hydration.date === todayDate;
}).numOunces);

$('#hydration-friend-ounces-today').text(userRepository.calculateAverageDailyWater(todayDate));

$('#hydration-info-glasses-today').text(hydrationData.find(hydration => {
  return hydration.userID === user.id && hydration.date === todayDate;
}).numOunces / 8);

$('#sleep-calendar-hours-average-weekly').text(user.calculateAverageHoursThisWeek(todayDate));

$('#sleep-calendar-quality-average-weekly').text(user.calculateAverageQualityThisWeek(todayDate));

$('#sleep-friend-longest-sleeper').text(userRepository.users.find(user => {
  return user.id === userRepository.getLongestSleepers(todayDate)
}).getFirstName());

$('#sleep-friend-worst-sleeper').text(userRepository.users.find(user => {
  return user.id === userRepository.getWorstSleepers(todayDate)
}).getFirstName());

$('#sleep-info-hours-average-alltime').text(user.hoursSleptAverage);

$('#steps-info-miles-walked-today').text(user.activityRecord.find(activity => {
  return (activity.date === todayDate && activity.userId === user.id)
}).calculateMiles(userRepository));

$('#sleep-info-quality-average-alltime').text(user.sleepQualityAverage);

$('#sleep-info-quality-today').text(sleepData.find(sleep => {
  return sleep.userID === user.id && sleep.date === todayDate;
}).sleepQuality);

$('#sleep-user-hours-today').text(sleepData.find(sleep => {
  return sleep.userID === user.id && sleep.date === todayDate;
}).hoursSlept);

$('#stairs-calendar-flights-average-weekly').text(user.calculateAverageFlightsThisWeek(todayDate));

$('#stairs-calendar-stairs-average-weekly').text((user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0));

$('#stairs-friend-flights-average-today').text((userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1));

$('#stairs-info-flights-today').text(activityData.find(activity => {
  return activity.userID === user.id && activity.date === todayDate;
}).flightsOfStairs);

$('#stairs-user-stairs-today').text(activityData.find(activity => {
  return activity.userID === user.id && activity.date === todayDate;
}).flightsOfStairs * 12);

$('#stairs-calendar-flights-average-weekly').text(user.calculateAverageFlightsThisWeek(todayDate));

$('#stairs-calendar-stairs-average-weekly').text(user.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);

$('#steps-calendar-total-active-minutes-weekly').text(
user.calculateAverageMinutesActiveThisWeek(todayDate));

$('#steps-calendar-total-steps-weekly').text(user.calculateAverageStepsThisWeek(todayDate));

$('#steps-friend-active-minutes-average-today').text( userRepository.calculateAverageMinutesActive(todayDate));

$('#steps-friend-average-step-goal').text(`${userRepository.calculateAverageStepGoal()}`);

$('#steps-friend-steps-average-today').text(userRepository.calculateAverageSteps(todayDate));

$('#steps-info-active-minutes-today').text(activityData.find(activity => {
  return activity.userID === user.id && activity.date === todayDate;
}).minutesActive);

$('#steps-user-steps-today').text(activityData.find(activity => {
  return activity.userID === user.id && activity.date === todayDate;
}).numSteps);

user.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
user.friendsActivityRecords.forEach(friend => {
  $('#dropdown-friends-steps-container').append(`
  <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>
  `);
});

let friendsStepsParagraphs = $('.friends-steps');
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
