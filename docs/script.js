const images = {
  'Akamwesi Mall': 'images/akamwesi.jpg',
  'Arena Mall': 'images/arena.jpg',
  'Kookie Towers': 'images/kookie_tower.webp',
  'Majestic Plaza': 'images/majestic.jpg'
};

const data = [
  {
    name: 'Akamwesi Mall',
    city: 'Kampala',
    phone: '+256700000001',
    rooms: {
      'Ground Floor': [
        { number: 'G1', status: 'vacant', rent: 500000 },
        { number: 'G2', status: 'occupied', rent: 650000 },
        { number: 'G3', status: 'vacant', rent: 520000 }
      ],
      'First Floor': [
        { number: 'F1', status: 'occupied', rent: 780000 },
        { number: 'F2', status: 'vacant', rent: 820000 },
        { number: 'F3', status: 'occupied', rent: 710000 }
      ]
    }
  },
  {
    name: 'Arena Mall',
    city: 'Mbarara',
    phone: '+256700000002',
    rooms: {
      'Ground Floor': [
        { number: 'A1', status: 'vacant', rent: 560000 },
        { number: 'A2', status: 'occupied', rent: 680000 },
        { number: 'A3', status: 'vacant', rent: 580000 }
      ],
      'First Floor': [
        { number: 'A4', status: 'occupied', rent: 760000 },
        { number: 'A5', status: 'vacant', rent: 790000 },
        { number: 'A6', status: 'occupied', rent: 740000 }
      ]
    }
  },
  {
    name: 'Kookie Towers',
    city: 'Entebbe',
    phone: '+256700000003',
    rooms: {
      'Ground Floor': [
        { number: 'K1', status: 'occupied', rent: 700000 },
        { number: 'K2', status: 'vacant', rent: 730000 },
        { number: 'K3', status: 'vacant', rent: 690000 }
      ],
      'First Floor': [
        { number: 'K4', status: 'occupied', rent: 820000 },
        { number: 'K5', status: 'vacant', rent: 860000 },
        { number: 'K6', status: 'occupied', rent: 790000 }
      ]
    }
  },
  {
    name: 'Majestic Plaza',
    city: 'Jinja',
    phone: '+256700000004',
    rooms: {
      'Ground Floor': [
        { number: 'M1', status: 'vacant', rent: 610000 },
        { number: 'M2', status: 'occupied', rent: 780000 },
        { number: 'M3', status: 'vacant', rent: 640000 }
      ],
      'First Floor': [
        { number: 'M4', status: 'occupied', rent: 890000 },
        { number: 'M5', status: 'vacant', rent: 930000 },
        { number: 'M6', status: 'occupied', rent: 840000 }
      ]
    }
  }
];

const uploadFields = [
  { inputId: 'applicantPhoto', previewId: 'applicantPhotoPreview', label: 'Applicant photo' },
  { inputId: 'applicantIdFront', previewId: 'applicantIdFrontPreview', label: 'ID front' },
  { inputId: 'applicantIdBack', previewId: 'applicantIdBackPreview', label: 'ID back' }
];
const maxUploadSizeBytes = 5 * 1024 * 1024;

const state = {
  activeTab: 'tenant',
  signedInLandlord: null,
  selectedMall: data[0],
  selectedFloor: 'Ground Floor',
  selectedRoom: data[0].rooms['Ground Floor'][0],
  notifications: [
    { mall: 'Akamwesi Mall', message: 'New room application received for G2.' },
    { mall: 'Kookie Towers', message: 'Utility bill approved and sent to tenant.' }
  ],
  applications: [
    { name: 'Amina Nakato', businessName: 'Fashion Boutique', mall: 'Akamwesi Mall', room: 'G2', phone: '+256701234567' },
    { name: 'David Okello', businessName: 'Phone Accessories', mall: 'Majestic Plaza', room: 'M1', phone: 'Not provided' }
  ],
  pendingUploads: {}
};

const mallCardsEl = document.getElementById('mallCards');
const tenantMallAvailabilityEl = document.getElementById('tenantMallAvailability');
const landlordMallAvailabilityEl = document.getElementById('landlordMallAvailability');
const tenantAvailabilityTitleEl = document.getElementById('tenantAvailabilityTitle');
const mallLogoEl = document.getElementById('mallLogo');
const mallLabelEl = document.getElementById('mallLabel');
const selectedMallImageEl = document.getElementById('selectedMallImage');
const roomHeadingEl = document.getElementById('roomHeading');
const floorSelectEl = document.getElementById('floorSelect');
const roomSelectEl = document.getElementById('roomSelect');
const applicationFloorSelectEl = document.getElementById('applicationFloorSelect');
const applicationRoomSelectEl = document.getElementById('applicationRoomSelect');
const applicationMallNameEl = document.getElementById('applicationMallName');
const roomNumberReadoutEl = document.getElementById('roomNumberReadout');
const roomStatusReadoutEl = document.getElementById('roomStatusReadout');
const roomRentReadoutEl = document.getElementById('roomRentReadout');
const applicationFormEl = document.getElementById('applicationForm');
const uploadMessageEl = document.getElementById('uploadMessage');
const applicationMessageEl = document.getElementById('applicationMessage');
const notificationBadgeEl = document.getElementById('notificationBadge');
const notificationListEl = document.getElementById('notificationList');
const emptyNotificationsEl = document.getElementById('emptyNotifications');
const pendingApplicationsEl = document.getElementById('pendingApplications');
const noApplicationsEl = document.getElementById('noApplications');
const landlordLoginFormEl = document.getElementById('landlordLoginForm');
const landlordMallSelectEl = document.getElementById('landlordMallSelect');
const landlordNameEl = document.getElementById('landlordName');
const landlordLoginViewEl = document.getElementById('landlordLoginView');
const landlordLoginMessageEl = document.getElementById('landlordLoginMessage');
const landlordDashboardEl = document.getElementById('landlordDashboard');
const landlordDashboardTitleEl = document.getElementById('landlordDashboardTitle');
const adminFloorSelectEl = document.getElementById('adminFloorSelect');
const adminRoomSelectEl = document.getElementById('adminRoomSelect');
const selectedTenantNameEl = document.getElementById('selectedTenantName');
const selectedTenantPhoneEl = document.getElementById('selectedTenantPhone');
const selectedBaseRentEl = document.getElementById('selectedBaseRent');
const previousReadingEl = document.getElementById('previousReading');
const currentReadingEl = document.getElementById('currentReading');
const unitTariffEl = document.getElementById('unitTariff');
const waterPreviousReadingEl = document.getElementById('waterPreviousReading');
const waterCurrentReadingEl = document.getElementById('waterCurrentReading');
const waterUnitTariffEl = document.getElementById('waterUnitTariff');
const unitsUsedEl = document.getElementById('unitsUsed');
const utilityChargeEl = document.getElementById('utilityCharge');
const waterUnitsUsedEl = document.getElementById('waterUnitsUsed');
const waterChargeEl = document.getElementById('waterCharge');
const baseRentDueEl = document.getElementById('baseRentDue');
const totalDueEl = document.getElementById('totalDue');
const billValidationMessageEl = document.getElementById('billValidationMessage');
const electricityMeterInputs = [previousReadingEl, currentReadingEl, unitTariffEl];
const waterMeterInputs = [waterPreviousReadingEl, waterCurrentReadingEl, waterUnitTariffEl];
const allMeterInputs = [...electricityMeterInputs, ...waterMeterInputs];

function formatMoney(value) {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    maximumFractionDigits: 0
  }).format(value);
}

function getVisibleNotifications() {
  if (state.activeTab !== 'landlord') {
    return state.notifications;
  }

  if (!state.signedInLandlord) {
    return [];
  }

  return state.notifications.filter((item) => item.mall === state.signedInLandlord.mall);
}

function updateNotificationBadge() {
  notificationBadgeEl.textContent = String(getVisibleNotifications().length);
}

function renderLandlordMallOptions() {
  data.forEach((mall) => {
    const option = document.createElement('option');
    option.value = mall.name;
    option.textContent = `${mall.name} · ${mall.city}`;
    landlordMallSelectEl.appendChild(option);
  });
}

function setSelectOptions(select, items, getValue, getLabel) {
  const options = items.map((item) => {
    const option = document.createElement('option');
    option.value = getValue(item);
    option.textContent = getLabel(item);
    return option;
  });
  select.replaceChildren(...options);
}

function getRoomCounts(mall) {
  const rooms = Object.values(mall.rooms).flat();
  return {
    vacant: rooms.filter((room) => room.status === 'vacant').length,
    occupied: rooms.filter((room) => room.status === 'occupied').length,
    total: rooms.length
  };
}

function renderMallAvailability(container) {
  container.replaceChildren();

  const mall = state.selectedMall;
  const counts = getRoomCounts(mall);
  const card = document.createElement('article');
  card.className = 'availability-card current';

  const heading = document.createElement('div');
  heading.className = 'availability-card-heading';
  const name = document.createElement('strong');
  name.textContent = mall.name;
  const city = document.createElement('span');
  city.textContent = mall.city;
  heading.append(name, city);

  const countGrid = document.createElement('div');
  countGrid.className = 'availability-counts';
  [
    { label: 'Vacant', count: counts.vacant, className: 'vacant' },
    { label: 'Occupied', count: counts.occupied, className: 'occupied' }
  ].forEach((item) => {
    const count = document.createElement('div');
    count.className = `availability-count ${item.className}`;
    const value = document.createElement('strong');
    value.textContent = String(item.count);
    const label = document.createElement('span');
    label.textContent = item.label;
    count.append(value, label);
    countGrid.appendChild(count);
  });

  card.append(heading, countGrid);
  container.appendChild(card);
}

function renderMallCards() {
  mallCardsEl.replaceChildren();

  data.forEach((mall) => {
    const button = document.createElement('button');
    button.className = `mall-card ${state.selectedMall.name === mall.name ? 'active' : ''}`;
    button.type = 'button';
    const image = document.createElement('img');
    image.src = images[mall.name];
    image.alt = mall.name;

    const info = document.createElement('div');
    info.className = 'mall-info';
    const name = document.createElement('strong');
    name.textContent = mall.name;
    const city = document.createElement('span');
    city.textContent = mall.city;
    info.append(name, city);
    button.append(image, info);

    button.addEventListener('click', () => {
      state.selectedMall = mall;
      state.selectedFloor = Object.keys(mall.rooms)[0];
      state.selectedRoom = mall.rooms[state.selectedFloor][0];
      renderMallCards();
      renderMallDetails();
      renderAdminUtility();
    });

    mallCardsEl.appendChild(button);
  });

  renderMallAvailability(tenantMallAvailabilityEl);
  renderMallAvailability(landlordMallAvailabilityEl);
  tenantAvailabilityTitleEl.textContent = `${state.selectedMall.name} availability`;
}

function renderMallDetails() {
  const { name, city, rooms } = state.selectedMall;
  applicationMallNameEl.textContent = name;
  mallLabelEl.textContent = `${name} • ${city}`;
  roomHeadingEl.textContent = name;
  mallLogoEl.src = 'images/logow.png';
  selectedMallImageEl.src = images[name];

  const floorNames = Object.keys(rooms);
  setSelectOptions(floorSelectEl, floorNames, (floor) => floor, (floor) => floor);
  floorSelectEl.value = state.selectedFloor;

  setSelectOptions(applicationFloorSelectEl, floorNames, (floor) => floor, (floor) => floor);
  applicationFloorSelectEl.value = state.selectedFloor;

  const selectedRoomList = rooms[state.selectedFloor];
  setSelectOptions(roomSelectEl, selectedRoomList, (room) => room.number, (room) => room.number);

  const room = selectedRoomList.find((item) => item.number === state.selectedRoom.number) || selectedRoomList[0];
  state.selectedRoom = room;
  roomSelectEl.value = room.number;
  setSelectOptions(applicationRoomSelectEl, selectedRoomList, (item) => item.number, (item) => item.number);
  applicationRoomSelectEl.value = room.number;

  renderSelectedRoom(room);
  setSelectOptions(adminFloorSelectEl, floorNames, (floor) => floor, (floor) => floor);
  adminFloorSelectEl.value = state.selectedFloor;
  renderMallAvailability(tenantMallAvailabilityEl);
  renderMallAvailability(landlordMallAvailabilityEl);
  tenantAvailabilityTitleEl.textContent = `${name} availability`;
  renderAdminUtility();
}

function renderSelectedRoom(room) {
  state.selectedRoom = room;
  roomSelectEl.value = room.number;
  applicationRoomSelectEl.value = room.number;
  roomNumberReadoutEl.textContent = `Room ${room.number}`;
  roomStatusReadoutEl.textContent = room.status.toUpperCase();
  roomStatusReadoutEl.classList.toggle('vacant', room.status === 'vacant');
  roomStatusReadoutEl.classList.toggle('occupied', room.status === 'occupied');
  roomRentReadoutEl.textContent = `Base Rent: ${formatMoney(room.rent)}`;
}

function renderAdminUtility() {
  const rooms = state.selectedMall.rooms[state.selectedFloor];
  const selectedRoom = rooms.find((room) => room.number === adminRoomSelectEl.value) || rooms[0];
  setSelectOptions(adminRoomSelectEl, rooms, (room) => room.number, (room) => room.number);
  adminRoomSelectEl.value = selectedRoom.number;

  const tenant = {
    name: 'Amina Nakato',
    phone: '+256701234567',
    rent: selectedRoom.rent
  };

  selectedTenantNameEl.textContent = `Tenant: ${tenant.name}`;
  selectedTenantPhoneEl.textContent = `Phone: ${tenant.phone}`;
  selectedBaseRentEl.textContent = `Base Rent: ${formatMoney(tenant.rent)}`;

  const electricity = calculateMeterCharge(previousReadingEl, currentReadingEl, unitTariffEl);
  const water = calculateMeterCharge(
    waterPreviousReadingEl,
    waterCurrentReadingEl,
    waterUnitTariffEl
  );
  const hasInvalidReadings = electricity.error || water.error;

  electricityMeterInputs.forEach((input) => {
    input.setCustomValidity(electricity.error);
  });
  waterMeterInputs.forEach((input) => {
    input.setCustomValidity(water.error);
  });
  billValidationMessageEl.textContent = hasInvalidReadings
    ? `${electricity.error ? `Electricity: ${electricity.error}` : ''}${electricity.error && water.error ? ' ' : ''}${water.error ? `Water: ${water.error}` : ''}`
    : '';
  baseRentDueEl.textContent = formatMoney(tenant.rent);
  unitsUsedEl.textContent = electricity.units.toLocaleString('en-UG');
  utilityChargeEl.textContent = formatMoney(electricity.charge);
  waterUnitsUsedEl.textContent = water.units.toLocaleString('en-UG');
  waterChargeEl.textContent = formatMoney(water.charge);
  const total = tenant.rent + electricity.charge + water.charge;
  totalDueEl.closest('.grand-total').hidden = Boolean(hasInvalidReadings);
  totalDueEl.textContent = formatMoney(total);
}

function calculateMeterCharge(previousInput, currentInput, tariffInput) {
  const previous = Number(previousInput.value);
  const current = Number(currentInput.value);
  const tariff = Number(tariffInput.value);

  if (
    previousInput.value === '' ||
    currentInput.value === '' ||
    tariffInput.value === '' ||
    !Number.isFinite(previous) ||
    !Number.isFinite(current) ||
    !Number.isFinite(tariff) ||
    previous < 0 ||
    current < previous ||
    tariff < 0
  ) {
    return {
      units: 0,
      charge: 0,
      error: 'Meter readings must be non-negative, and current readings cannot be lower than previous readings.'
    };
  }

  const units = current - previous;
  return { units, charge: Math.round(units * tariff), error: '' };
}

function renderNotifications() {
  const notifications = getVisibleNotifications();
  updateNotificationBadge();
  notificationListEl.replaceChildren();

  emptyNotificationsEl.classList.toggle('hidden', notifications.length > 0);
  notifications.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'notification-item';
    const mall = document.createElement('strong');
    mall.textContent = item.mall;
    const message = document.createElement('p');
    message.textContent = item.message;
    row.append(mall, message);
    notificationListEl.appendChild(row);
  });
}

function renderApplications() {
  const applications = state.signedInLandlord
    ? state.applications.filter((item) => item.mall === state.signedInLandlord.mall)
    : state.applications;

  if (!applications.length) {
    pendingApplicationsEl.replaceChildren();
    noApplicationsEl.classList.remove('hidden');
    return;
  }

  noApplicationsEl.classList.add('hidden');
  pendingApplicationsEl.replaceChildren();
  applications.forEach((item) => {
    const row = document.createElement('article');
    row.className = 'application-item';
    const details = document.createElement('div');
    details.className = 'application-details';
    const name = document.createElement('strong');
    name.textContent = item.name;
    const business = document.createElement('span');
    business.textContent = `Business: ${item.businessName || 'Not provided'}`;
    const room = document.createElement('span');
    room.textContent = `${item.mall} · ${item.room} · ${item.phone}`;
    details.append(name, business, room);

    const documents = document.createElement('div');
    documents.className = 'application-documents';
    if (item.uploads) {
      item.uploads.forEach((upload) => {
        const link = document.createElement('a');
        link.href = upload.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = upload.label;
        link.setAttribute('aria-label', `View ${upload.label} for ${item.name}`);
        documents.appendChild(link);
      });
    } else {
      const legacy = document.createElement('span');
      legacy.textContent = 'No documents attached';
      documents.appendChild(legacy);
    }

    row.append(details, documents);
    pendingApplicationsEl.appendChild(row);
  });
}

function setUploadMessage(message, isError = false) {
  uploadMessageEl.textContent = message;
  uploadMessageEl.classList.toggle('error', isError);
}

function handleApplicationUpload(event, field) {
  const input = event.currentTarget;
  const file = input.files[0];
  const preview = document.getElementById(field.previewId);
  const previousUpload = state.pendingUploads[field.inputId];

  if (previousUpload && !state.applications.some((application) =>
    application.uploads && application.uploads.some((upload) => upload.url === previousUpload.url)
  )) {
    URL.revokeObjectURL(previousUpload.url);
  }
  delete state.pendingUploads[field.inputId];
  preview.removeAttribute('src');
  preview.classList.add('hidden');
  input.setCustomValidity('');

  if (!file) return;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
    input.setCustomValidity('Choose a JPG, PNG, or WebP image.');
    input.reportValidity();
    input.value = '';
    setUploadMessage(`${field.label} must be a JPG, PNG, or WebP image.`, true);
    return;
  }
  if (file.size > maxUploadSizeBytes) {
    input.setCustomValidity('Image files must be no larger than 5 MB.');
    input.reportValidity();
    input.value = '';
    setUploadMessage(`${field.label} is larger than 5 MB.`, true);
    return;
  }

  const upload = {
    label: field.label,
    fileName: file.name,
    url: URL.createObjectURL(file)
  };
  state.pendingUploads[field.inputId] = upload;
  preview.src = upload.url;
  preview.classList.remove('hidden');
  setUploadMessage('All documents are ready to attach to your application.');
}

uploadFields.forEach((field) => {
  document.getElementById(field.inputId).addEventListener('change', (event) => {
    handleApplicationUpload(event, field);
  });
});

floorSelectEl.addEventListener('change', (event) => {
  state.selectedFloor = event.target.value;
  const firstRoom = state.selectedMall.rooms[state.selectedFloor][0];
  state.selectedRoom = firstRoom;
  renderMallDetails();
});

roomSelectEl.addEventListener('change', (event) => {
  const room = state.selectedMall.rooms[state.selectedFloor].find((item) => item.number === event.target.value);
  renderSelectedRoom(room);
});

applicationFloorSelectEl.addEventListener('change', (event) => {
  state.selectedFloor = event.target.value;
  state.selectedRoom = state.selectedMall.rooms[state.selectedFloor][0];
  renderMallDetails();
});

applicationRoomSelectEl.addEventListener('change', (event) => {
  const room = state.selectedMall.rooms[state.selectedFloor].find((item) => item.number === event.target.value);
  if (room) renderSelectedRoom(room);
});

applicationFormEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('applicantName').value.trim();
  const phone = document.getElementById('applicantPhone').value.trim();
  const businessName = document.getElementById('applicantBusinessName').value.trim();
  const uploads = uploadFields.map((field) => state.pendingUploads[field.inputId]);
  if (!name || !phone || !businessName || uploads.some((upload) => !upload)) return;
  if (state.selectedRoom.status !== 'vacant') {
    applicationMessageEl.textContent = 'This room is occupied. Choose a vacant room to apply.';
    return;
  }

  state.applications.unshift({
    name,
    businessName,
    mall: state.selectedMall.name,
    room: state.selectedRoom.number,
    phone,
    uploads: uploads.map((upload) => ({ ...upload }))
  });

  state.notifications.unshift({
    mall: state.selectedMall.name,
    message: `${name} submitted an application for room ${state.selectedRoom.number}.`
  });

  renderApplications();
  renderNotifications();
  updateNotificationBadge();
  applicationFormEl.reset();
  state.pendingUploads = {};
  state.selectedFloor = Object.keys(state.selectedMall.rooms)[0];
  state.selectedRoom = state.selectedMall.rooms[state.selectedFloor][0];
  renderMallDetails();
  uploadFields.forEach((field) => {
    const preview = document.getElementById(field.previewId);
    preview.removeAttribute('src');
    preview.classList.add('hidden');
  });
  applicationMessageEl.textContent = 'Application added to the pending list.';
  setUploadMessage('JPG, PNG, or WebP images up to 5 MB each.');
});

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');
const screens = document.querySelectorAll('.screen');

tabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    state.activeTab = button.dataset.tab;
    if (state.activeTab === 'tenant') {
      state.signedInLandlord = null;
      landlordLoginFormEl.reset();
      landlordLoginMessageEl.textContent = '';
      landlordLoginViewEl.classList.remove('hidden');
      landlordDashboardEl.classList.add('hidden');
    }

    tabButtons.forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.tab === state.activeTab);
      tab.setAttribute('aria-selected', String(tab.dataset.tab === state.activeTab));
    });

    tabPanels.forEach((panel) => {
      panel.classList.toggle('active', panel.id === `${state.activeTab}Panel`);
    });

    screens.forEach((screen) => {
      screen.classList.toggle('hidden', !screen.id.includes(state.activeTab));
      screen.classList.toggle('active', screen.id.includes(state.activeTab));
    });

    renderNotifications();
  });
});

landlordLoginFormEl.addEventListener('submit', (event) => {
  event.preventDefault();

  const mall = data.find((item) => item.name === landlordMallSelectEl.value);

  if (!mall) {
    landlordLoginMessageEl.textContent = 'Select a mall to open its dashboard.';
    return;
  }

  const landlordName = landlordNameEl.value.trim();
  state.signedInLandlord = { name: landlordName, mall: mall.name };
  state.selectedMall = mall;
  state.selectedFloor = Object.keys(mall.rooms)[0];
  state.selectedRoom = mall.rooms[state.selectedFloor][0];
  landlordDashboardTitleEl.textContent = `${landlordName}'s Dashboard - ${mall.name}`;
  landlordLoginMessageEl.textContent = '';
  landlordLoginViewEl.classList.add('hidden');
  landlordDashboardEl.classList.remove('hidden');
  renderMallCards();
  renderMallDetails();
  renderApplications();
  renderNotifications();
});

document.getElementById('landlordLogoutBtn').addEventListener('click', () => {
  state.signedInLandlord = null;
  landlordLoginFormEl.reset();
  landlordLoginMessageEl.textContent = '';
  landlordLoginViewEl.classList.remove('hidden');
  landlordDashboardEl.classList.add('hidden');
  renderApplications();
  renderNotifications();
});

document.getElementById('notificationButton').addEventListener('click', () => {
  document.getElementById('notificationPanel').classList.toggle('hidden');
});

document.getElementById('closeNotifications').addEventListener('click', () => {
  document.getElementById('notificationPanel').classList.add('hidden');
});

document.getElementById('supportToggle').addEventListener('click', () => {
  document.getElementById('supportMenu').classList.toggle('hidden');
});

document.getElementById('addNotificationBtn').addEventListener('click', () => {
  state.notifications.unshift({
    mall: state.selectedMall.name,
    message: `A landlord note was added for ${state.selectedMall.name}.`
  });
  renderNotifications();
  updateNotificationBadge();
});

document.getElementById('calculateBillBtn').addEventListener('click', () => {
  const firstInvalidInput = allMeterInputs.find((input) => !input.checkValidity());
  if (firstInvalidInput) {
    firstInvalidInput.reportValidity();
    return;
  }

  renderAdminUtility();
});

allMeterInputs.forEach((input) => {
  input.addEventListener('input', renderAdminUtility);
});

adminFloorSelectEl.addEventListener('change', (event) => {
  state.selectedFloor = event.target.value;
  renderMallDetails();
});

adminRoomSelectEl.addEventListener('change', () => {
  renderAdminUtility();
});

renderMallCards();
renderLandlordMallOptions();
renderMallDetails();
renderNotifications();
renderApplications();
updateNotificationBadge();
renderAdminUtility();
