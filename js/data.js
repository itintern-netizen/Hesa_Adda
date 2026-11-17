/**
 * Hesa Adda - Mock Data & Seed Data (js/data.js)
 * 12 Sample applications across Telangana, Karnataka, and Maharashtra
 * 3 Approved Addas
 * Score calculation algorithm using specified weights
 */

// Site score calculation function
// Weights: traffic (30), villages (25), competition (15), land access (15), warehouse distance (10), Hesaathi presence (5)
function calculateSiteScore(factors) {
  const f = factors || {};
  const traffic = Math.min(30, Math.max(0, f.traffic || 22));
  const villages = Math.min(25, Math.max(0, f.villages || 18));
  const competition = Math.min(15, Math.max(0, f.competition || 12));
  const landAccess = Math.min(15, Math.max(0, f.landAccess || 13));
  const warehouse = Math.min(10, Math.max(0, f.warehouse || 8));
  const hesaathi = Math.min(5, Math.max(0, f.hesaathi || 4));

  const total = Math.round(traffic + villages + competition + landAccess + warehouse + hesaathi);
  return {
    total: Math.min(100, Math.max(0, total)),
    breakdown: {
      traffic,
      villages,
      competition,
      landAccess,
      warehouse,
      hesaathi
    }
  };
}

// Sample applications
const SAMPLE_APPLICATIONS = [
  {
    id: "HA-2026-001",
    applicantName: "Ramesh Reddy",
    phone: "9848012345",
    altPhone: "9848098765",
    email: "ramesh.reddy@gmail.com",
    village: "Kamareddy",
    mandal: "Bhiknoor",
    district: "Kamareddy",
    state: "Telangana",
    pincode: "503101",
    idType: "Aadhaar",
    idNumber: "XXXX-XXXX-4589",
    lat: 18.3218,
    lng: 78.3375,
    highway: "NH 44 (Hyderabad - Nagpur)",
    distanceFromHighwayKm: 0.08,
    landSizeSqFt: 4800,
    ownershipType: "own",
    status: "Under review",
    submittedAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    factors: { traffic: 26, villages: 22, competition: 13, landAccess: 14, warehouse: 8, hesaathi: 5 },
    autoChecks: {
      distanceToNH: "80 meters",
      nearestTollPlaza: "Indalwai Toll Plaza (12 km)",
      nearbyCompetitors: "1 local dhaba (800m away), no modern retail",
      villagesWithin20km: "18 villages (pop ~48,000)",
      distanceToSaamaanWarehouse: "14 km (Nizamabad Central Hub)"
    },
    managerVisit: {
      scheduled: true,
      managerName: "Vikram Patil",
      visitDate: "2026-11-18",
      visited: false,
      checklist: {
        setbackOk: true,
        roadAccess: true,
        electricity: true,
        water: true,
        truckParking: true,
        papersMatch: true
      },
      notes: "Excellent wide junction with natural truck stoppage point.",
      photo: "front_land.jpg"
    },
    documents: [
      { name: "Aadhaar Card (Front/Back)", type: "idProof", status: "Verified" },
      { name: "Pattadar Passbook (Land Title)", type: "landOwnership", status: "Verified" },
      { name: "Front View Photo (NH 44 Facing)", type: "photoFront", status: "Uploaded" },
      { name: "Road View Photo", type: "photoRoad", status: "Uploaded" },
      { name: "Surroundings View", type: "photoSurroundings", status: "Uploaded" }
    ]
  },
  {
    id: "HA-2026-002",
    applicantName: "Basavaraj Bommai Gowda",
    phone: "9448123456",
    altPhone: "",
    email: "gowda.b@outlook.com",
    village: "Hirekerur Cross",
    mandal: "Hirekerur",
    district: "Haveri",
    state: "Karnataka",
    pincode: "581111",
    idType: "Aadhaar",
    idNumber: "XXXX-XXXX-6721",
    lat: 14.4532,
    lng: 75.3912,
    highway: "NH 48 (Pune - Bengaluru)",
    distanceFromHighwayKm: 0.2,
    landSizeSqFt: 5200,
    ownershipType: "own",
    status: "Approved",
    submittedAt: new Date(Date.now() - 44 * 3600 * 1000).toISOString(),
    addaId: "ADDA-KA-004",
    loginSent: true,
    factors: { traffic: 28, villages: 24, competition: 14, landAccess: 14, warehouse: 7, hesaathi: 5 },
    autoChecks: {
      distanceToNH: "120 meters",
      nearestTollPlaza: "Bankapur Toll (28 km)",
      nearbyCompetitors: "Zero commercial outlets within 5 km",
      villagesWithin20km: "24 villages (pop ~62,000)",
      distanceToSaamaanWarehouse: "22 km (Hubballi Hub)"
    },
    managerVisit: {
      scheduled: true,
      managerName: "Anand Kulkarni",
      visitDate: "2026-11-16",
      visited: true,
      checklist: {
        setbackOk: true,
        roadAccess: true,
        electricity: true,
        water: true,
        truckParking: true,
        papersMatch: true
      },
      notes: "Clear title, 3-phase electricity pole directly adjacent. Highly recommended.",
      photo: "haveri_site.jpg"
    },
    documents: [
      { name: "Aadhaar Card", type: "idProof", status: "Verified" },
      { name: "RTC / Pahani Extract", type: "landOwnership", status: "Verified" },
      { name: "Site Front Photo", type: "photoFront", status: "Verified" }
    ]
  },
  {
    id: "HA-2026-003",
    applicantName: "Sanjay Deshmukh",
    phone: "9822456789",
    altPhone: "9822112233",
    email: "sanjay.deshmukh@gmail.com",
    village: "Indapur Phata",
    mandal: "Indapur",
    district: "Pune",
    state: "Maharashtra",
    pincode: "413106",
    idType: "PAN",
    idNumber: "ABCDE1234F",
    lat: 18.1147,
    lng: 75.0305,
    highway: "NH 65 (Pune - Hyderabad)",
    distanceFromHighwayKm: 0.05,
    landSizeSqFt: 3600,
    ownershipType: "lease",
    status: "Under review",
    submittedAt: new Date(Date.now() - 39 * 3600 * 1000).toISOString(),
    factors: { traffic: 25, villages: 19, competition: 11, landAccess: 13, warehouse: 9, hesaathi: 4 },
    autoChecks: {
      distanceToNH: "50 meters",
      nearestTollPlaza: "Sardewadi Toll Plaza (9 km)",
      nearbyCompetitors: "2 petrol bunks nearby",
      villagesWithin20km: "15 villages (pop ~35,000)",
      distanceToSaamaanWarehouse: "11 km (Solapur-Pune feeder)"
    },
    managerVisit: {
      scheduled: true,
      managerName: "Vikram Patil",
      visitDate: "2026-11-17",
      visited: true,
      checklist: {
        setbackOk: true,
        roadAccess: true,
        electricity: true,
        water: true,
        truckParking: true,
        papersMatch: true
      },
      notes: "Corner plot with great turning circle for logistics vans.",
      photo: "indapur_site.jpg"
    },
    documents: [
      { name: "PAN Card", type: "idProof", status: "Verified" },
      { name: "Registered Lease Deed (10 yrs)", type: "landOwnership", status: "Verified" },
      { name: "Front Photo", type: "photoFront", status: "Uploaded" }
    ]
  },
  {
    id: "HA-2026-004",
    applicantName: "Lakshmi Narayana Rao",
    phone: "9849234567",
    altPhone: "",
    email: "ln.rao@rediffmail.com",
    village: "Suryapet Bypass",
    mandal: "Suryapet",
    district: "Suryapet",
    state: "Telangana",
    pincode: "508213",
    idType: "Aadhaar",
    idNumber: "XXXX-XXXX-8912",
    lat: 17.1439,
    lng: 79.6239,
    highway: "NH 65 (Hyderabad - Vijayawada)",
    distanceFromHighwayKm: 0.15,
    landSizeSqFt: 6000,
    ownershipType: "own",
    status: "Submitted",
    submittedAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    factors: { traffic: 29, villages: 23, competition: 12, landAccess: 15, warehouse: 8, hesaathi: 5 },
    autoChecks: {
      distanceToNH: "95 meters",
      nearestTollPlaza: "Panthangi Toll (42 km)",
      nearbyCompetitors: "Dhabas present, zero retail aggregator",
      villagesWithin20km: "21 villages (pop ~55,000)",
      distanceToSaamaanWarehouse: "8 km (Suryapet Urban point)"
    },
    managerVisit: {
      scheduled: false,
      managerName: "Vikram Patil",
      visited: false
    },
    documents: [
      { name: "Aadhaar Card", type: "idProof", status: "Uploaded" },
      { name: "Pattadar Passbook", type: "landOwnership", status: "Uploaded" },
      { name: "Highway Frontage Photo", type: "photoFront", status: "Uploaded" }
    ]
  },
  {
    id: "HA-2026-005",
    applicantName: "Nitin B. Chavan",
    phone: "9765123987",
    altPhone: "",
    email: "nitin.chavan@gmail.com",
    village: "Umbraj Phata",
    mandal: "Karad",
    district: "Satara",
    state: "Maharashtra",
    pincode: "415109",
    idType: "Aadhaar",
    idNumber: "XXXX-XXXX-3341",
    lat: 17.4042,
    lng: 74.1568,
    highway: "NH 48 (Mumbai - Bengaluru)",
    distanceFromHighwayKm: 0.05,
    landSizeSqFt: 2900,
    ownershipType: "own",
    status: "Changes requested",
    changesReason: "Road view photo unclear. Need clearer survey map showing NH 48 boundary pillar.",
    submittedAt: new Date(Date.now() - 28 * 3600 * 1000).toISOString(),
    factors: { traffic: 24, villages: 17, competition: 10, landAccess: 11, warehouse: 7, hesaathi: 4 },
    autoChecks: {
      distanceToNH: "40 meters",
      nearestTollPlaza: "Taswade Toll Plaza (14 km)",
      nearbyCompetitors: "Tea stalls, tyre puncture shops",
      villagesWithin20km: "14 villages (pop ~32,000)",
      distanceToSaamaanWarehouse: "18 km (Satara Hub)"
    },
    managerVisit: {
      scheduled: true,
      managerName: "Vikram Patil",
      visited: false
    },
    documents: [
      { name: "Aadhaar Card", type: "idProof", status: "Verified" },
      { name: "7/12 Extract (Satbara)", type: "landOwnership", status: "Needs revision" },
      { name: "Road View Photo", type: "photoRoad", status: "Unclear" }
    ]
  },
  {
    id: "HA-2026-006",
    applicantName: "Mallikarjun Swamy",
    phone: "9480987123",
    altPhone: "",
    email: "swamy.malli@yahoo.com",
    village: "Kushtagi Junction",
    mandal: "Kushtagi",
    district: "Koppal",
    state: "Karnataka",
    pincode: "583277",
    idType: "Aadhaar",
    idNumber: "XXXX-XXXX-9921",
    lat: 15.7561,
    lng: 76.1969,
    highway: "NH 50 (Bidar - Hospet)",
    distanceFromHighwayKm: 0.8,
    landSizeSqFt: 2200,
    ownershipType: "panchayat",
    status: "Rejected",
    rejectionReason: "Land is 800m away from highway intersection; falls outside designated commerce frontage radius. Also inside flood plain margin.",
    submittedAt: new Date(Date.now() - 50 * 3600 * 1000).toISOString(),
    factors: { traffic: 14, villages: 12, competition: 9, landAccess: 6, warehouse: 3, hesaathi: 3 },
    autoChecks: {
      distanceToNH: "820 meters",
      nearestTollPlaza: "Hire-Waddanakeri (35 km)",
      nearbyCompetitors: "None",
      villagesWithin20km: "9 villages (pop ~19,000)",
      distanceToSaamaanWarehouse: "48 km (Hospet Hub)"
    },
    managerVisit: {
      scheduled: true,
      managerName: "Anand Kulkarni",
      visited: true,
      checklist: {
        setbackOk: false,
        roadAccess: false,
        electricity: false,
        water: true,
        truckParking: false,
        papersMatch: false
      },
      notes: "Narrow kutcha approach road. Heavy trucks cannot turn. Not recommended.",
      photo: "rejected_land.jpg"
    },
    documents: [
      { name: "Aadhaar Card", type: "idProof", status: "Verified" },
      { name: "Panchayat NOC Letter", type: "landOwnership", status: "Incomplete" }
    ]
  },
  {
    id: "HA-2026-007",
    applicantName: "Praveen Kumar Goud",
    phone: "9989011223",
    altPhone: "9989099887",
    email: "praveen.goud@gmail.com",
    village: "Jadcherla Cross",
    mandal: "Jadcherla",
    district: "Mahabubnagar",
    state: "Telangana",
    pincode: "509301",
    idType: "Aadhaar",
    idNumber: "XXXX-XXXX-1178",
    lat: 16.7663,
    lng: 78.1408,
    highway: "NH 44 (Hyderabad - Bengaluru)",
    distanceFromHighwayKm: 0.08,
    landSizeSqFt: 5500,
    ownershipType: "own",
    status: "Under review",
    submittedAt: new Date(Date.now() - 41 * 3600 * 1000).toISOString(),
    factors: { traffic: 29, villages: 23, competition: 13, landAccess: 14, warehouse: 9, hesaathi: 4 },
    autoChecks: {
      distanceToNH: "60 meters",
      nearestTollPlaza: "Raakal Toll (19 km)",
      nearbyCompetitors: "Dhabas and fuel station across the road",
      villagesWithin20km: "22 villages (pop ~59,000)",
      distanceToSaamaanWarehouse: "12 km (Mahabubnagar Central)"
    },
    managerVisit: {
      scheduled: true,
      managerName: "Vikram Patil",
      visitDate: "2026-11-17",
      visited: true,
      checklist: {
        setbackOk: true,
        roadAccess: true,
        electricity: true,
        water: true,
        truckParking: true,
        papersMatch: true
      },
      notes: "Ideal junction point connecting state highway to NH 44. Ready for foundation.",
      photo: "jadcherla_site.jpg"
    },
    documents: [
      { name: "Aadhaar Card", type: "idProof", status: "Verified" },
      { name: "Pattadar Title Deed", type: "landOwnership", status: "Verified" },
      { name: "Plot Frontage", type: "photoFront", status: "Verified" }
    ]
  },
  {
    id: "HA-2026-008",
    applicantName: "Ganesh K. Shinde",
    phone: "9823901234",
    altPhone: "",
    email: "ganesh.shinde@gmail.com",
    village: "Mohol Naka",
    mandal: "Mohol",
    district: "Solapur",
    state: "Maharashtra",
    pincode: "413213",
    idType: "Aadhaar",
    idNumber: "XXXX-XXXX-4411",
    lat: 17.8182,
    lng: 75.6517,
    highway: "NH 65 (Pune - Solapur)",
    distanceFromHighwayKm: 0.12,
    landSizeSqFt: 4200,
    ownershipType: "own",
    status: "Submitted",
    submittedAt: new Date(Date.now() - 52 * 3600 * 1000).toISOString(),
    factors: { traffic: 24, villages: 18, competition: 12, landAccess: 12, warehouse: 8, hesaathi: 4 },
    autoChecks: {
      distanceToNH: "110 meters",
      nearestTollPlaza: "Sawaleshwar Toll (16 km)",
      nearbyCompetitors: "1 roadside motel",
      villagesWithin20km: "16 villages (pop ~39,000)",
      distanceToSaamaanWarehouse: "26 km (Solapur Hub)"
    },
    managerVisit: {
      scheduled: false,
      managerName: "Vikram Patil",
      visited: false
    },
    documents: [
      { name: "Aadhaar Card", type: "idProof", status: "Uploaded" },
      { name: "7/12 Satbara Extract", type: "landOwnership", status: "Uploaded" }
    ]
  },
  {
    id: "HA-2026-009",
    applicantName: "Shivakumar Hiremath",
    phone: "9449887766",
    altPhone: "9449112244",
    email: "shivakumar.h@gmail.com",
    village: "Nippani Cross",
    mandal: "Nippani",
    district: "Belagavi",
    state: "Karnataka",
    pincode: "591237",
    idType: "Aadhaar",
    idNumber: "XXXX-XXXX-7788",
    lat: 16.4022,
    lng: 74.3821,
    highway: "NH 48 (Belagavi - Kolhapur border)",
    distanceFromHighwayKm: 0.06,
    landSizeSqFt: 6200,
    ownershipType: "own",
    status: "Under review",
    submittedAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    factors: { traffic: 28, villages: 21, competition: 11, landAccess: 15, warehouse: 8, hesaathi: 5 },
    autoChecks: {
      distanceToNH: "50 meters",
      nearestTollPlaza: "Hattargi Toll Plaza (31 km)",
      nearbyCompetitors: "3 food stalls, no organised grocery or services",
      villagesWithin20km: "19 villages (pop ~51,000)",
      distanceToSaamaanWarehouse: "32 km (Belagavi Node)"
    },
    managerVisit: {
      scheduled: true,
      managerName: "Anand Kulkarni",
      visitDate: "2026-11-18",
      visited: false
    },
    documents: [
      { name: "Aadhaar Card", type: "idProof", status: "Verified" },
      { name: "RTC Record", type: "landOwnership", status: "Verified" },
      { name: "Road Access Photo", type: "photoRoad", status: "Uploaded" }
    ]
  },
  {
    id: "HA-2026-010",
    applicantName: "Anitha Venkatesh",
    phone: "9848554433",
    altPhone: "",
    email: "anitha.v@gmail.com",
    village: "Armoor Junction",
    mandal: "Armoor",
    district: "Nizamabad",
    state: "Telangana",
    pincode: "503224",
    idType: "Aadhaar",
    idNumber: "XXXX-XXXX-2234",
    lat: 18.7901,
    lng: 78.2917,
    highway: "NH 44 & NH 63 Junction",
    distanceFromHighwayKm: 0.04,
    landSizeSqFt: 4500,
    ownershipType: "own",
    status: "Approved",
    submittedAt: new Date(Date.now() - 46 * 3600 * 1000).toISOString(),
    addaId: "ADDA-TS-002",
    loginSent: true,
    factors: { traffic: 30, villages: 25, competition: 13, landAccess: 14, warehouse: 9, hesaathi: 5 },
    autoChecks: {
      distanceToNH: "35 meters",
      nearestTollPlaza: "Indalwai Toll (30 km)",
      nearbyCompetitors: "None with multi-service capability",
      villagesWithin20km: "26 villages (pop ~74,000)",
      distanceToSaamaanWarehouse: "16 km (Nizamabad Central Hub)"
    },
    managerVisit: {
      scheduled: true,
      managerName: "Vikram Patil",
      visited: true,
      checklist: {
        setbackOk: true,
        roadAccess: true,
        electricity: true,
        water: true,
        truckParking: true,
        papersMatch: true
      },
      notes: "Major dual-highway junction. Ideal candidate for 500 sq ft modular prefab.",
      photo: "armoor_site.jpg"
    },
    documents: [
      { name: "Aadhaar Card", type: "idProof", status: "Verified" },
      { name: "Pattadar Title", type: "landOwnership", status: "Verified" }
    ]
  },
  {
    id: "HA-2026-011",
    applicantName: "Maheshwar Biradar",
    phone: "9823114455",
    altPhone: "",
    email: "maheshwar.b@yahoo.com",
    village: "Omerga Bypass",
    mandal: "Omerga",
    district: "Dharashiv (Osmanabad)",
    state: "Maharashtra",
    pincode: "413606",
    idType: "PAN",
    idNumber: "XYZPQ9876R",
    lat: 17.8423,
    lng: 76.6231,
    highway: "NH 65 (Solapur - Hyderabad)",
    distanceFromHighwayKm: 0.1,
    landSizeSqFt: 3800,
    ownershipType: "own",
    status: "Under review",
    submittedAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
    factors: { traffic: 26, villages: 20, competition: 12, landAccess: 13, warehouse: 7, hesaathi: 4 },
    autoChecks: {
      distanceToNH: "90 meters",
      nearestTollPlaza: "Omerga Toll (8 km)",
      nearbyCompetitors: "Dhabas only",
      villagesWithin20km: "17 villages (pop ~42,000)",
      distanceToSaamaanWarehouse: "36 km (Solapur Hub)"
    },
    managerVisit: {
      scheduled: true,
      managerName: "Vikram Patil",
      visitDate: "2026-11-19",
      visited: false
    },
    documents: [
      { name: "PAN Card", type: "idProof", status: "Verified" },
      { name: "7/12 Extract", type: "landOwnership", status: "Uploaded" }
    ]
  },
  {
    id: "HA-2026-012",
    applicantName: "Chandrasekhar Shetty",
    phone: "9448002233",
    altPhone: "",
    email: "cshetty@gmail.com",
    village: "Chitradurga Bypass",
    mandal: "Chitradurga",
    district: "Chitradurga",
    state: "Karnataka",
    pincode: "577501",
    idType: "Aadhaar",
    idNumber: "XXXX-XXXX-6611",
    lat: 14.2281,
    lng: 76.4019,
    highway: "NH 48 & NH 50 Junction",
    distanceFromHighwayKm: 0.08,
    landSizeSqFt: 5000,
    ownershipType: "lease",
    status: "Submitted",
    submittedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    factors: { traffic: 29, villages: 22, competition: 14, landAccess: 14, warehouse: 8, hesaathi: 4 },
    autoChecks: {
      distanceToNH: "75 meters",
      nearestTollPlaza: "Hebbalu Toll (15 km)",
      nearbyCompetitors: "Zero micro-warehouses",
      villagesWithin20km: "23 villages (pop ~60,000)",
      distanceToSaamaanWarehouse: "24 km (Davangere Node)"
    },
    managerVisit: {
      scheduled: false,
      managerName: "Anand Kulkarni",
      visited: false
    },
    documents: [
      { name: "Aadhaar Card", type: "idProof", status: "Uploaded" },
      { name: "Lease Agreement", type: "landOwnership", status: "Uploaded" }
    ]
  }
];

// 3 Approved Live/Setup Addas
const SAMPLE_ADDAS = [
  {
    addaId: "ADDA-TS-001",
    applicationId: "HA-2025-098",
    name: "Medchal Highway Hub",
    hesaathiName: "K. Sudhakar Rao",
    phone: "9848123450",
    highway: "NH 44 (Hyderabad - Nagpur)",
    village: "Medchal Cross",
    state: "Telangana",
    status: "Live",
    assignedManager: "Vikram Patil",
    setupProgress: 100,
    commissionDate: "2026-09-15",
    dailyFootfall: 1450,
    monthlyRevenue: "₹3,12,000",
    lat: 17.6298,
    lng: 78.4814
  },
  {
    addaId: "ADDA-KA-004",
    applicationId: "HA-2026-002",
    name: "Hirekerur Gateway Adda",
    hesaathiName: "Basavaraj Bommai Gowda",
    phone: "9448123456",
    highway: "NH 48 (Pune - Bengaluru)",
    village: "Hirekerur Cross",
    state: "Karnataka",
    status: "Setup",
    assignedManager: "Anand Kulkarni",
    setupProgress: 75,
    commissionDate: "Expected 2026-12-05",
    dailyFootfall: 0,
    monthlyRevenue: "Pending setup",
    lat: 14.4532,
    lng: 75.3912
  },
  {
    addaId: "ADDA-TS-002",
    applicationId: "HA-2026-010",
    name: "Armoor Junction Adda",
    hesaathiName: "Anitha Venkatesh",
    phone: "9848554433",
    highway: "NH 44 & NH 63 Junction",
    village: "Armoor Junction",
    state: "Telangana",
    status: "Setup",
    assignedManager: "Vikram Patil",
    setupProgress: 40,
    commissionDate: "Expected 2026-12-20",
    dailyFootfall: 0,
    monthlyRevenue: "Pending setup",
    lat: 18.7901,
    lng: 78.2917
  }
];

// Initial pre-registered users keyed by phone
const SAMPLE_USERS = {
  "9848012345": {
    phone: "9848012345",
    fullname: "Ramesh Reddy",
    village: "Kamareddy",
    language: "English",
    registeredAt: "2026-11-17T08:00:00.000Z"
  },
  "9448123456": {
    phone: "9448123456",
    fullname: "Basavaraj Bommai Gowda",
    village: "Hirekerur Cross",
    language: "Kannada",
    registeredAt: "2026-11-15T09:30:00.000Z"
  }
};

// Calculate scores
SAMPLE_APPLICATIONS.forEach(app => {
  const scoreData = calculateSiteScore(app.factors);
  app.siteScore = scoreData.total;
  app.scoreBreakdown = scoreData.breakdown;
});

// Safe localStorage initialization
function initializeMockData() {
  try {
    if (!localStorage.getItem('hesa_applications')) {
      localStorage.setItem('hesa_applications', JSON.stringify(SAMPLE_APPLICATIONS));
    }
    if (!localStorage.getItem('hesa_addas')) {
      localStorage.setItem('hesa_addas', JSON.stringify(SAMPLE_ADDAS));
    }
    if (!localStorage.getItem('hesa_users')) {
      localStorage.setItem('hesa_users', JSON.stringify(SAMPLE_USERS));
    }
    if (!localStorage.getItem('hesa_active_app_id')) {
      localStorage.setItem('hesa_active_app_id', 'HA-2026-001');
    }
    // Set a default session if none exists so users can demo immediately if they prefer
    if (!localStorage.getItem('hesa_session')) {
      localStorage.setItem('hesa_session', '9848012345');
    }
  } catch (e) {
    console.warn("Storage init warning:", e);
  }
}

// Global reset helper (accessible from footer on all pages)
function resetAllMockData() {
  try {
    localStorage.removeItem('hesa_applications');
    localStorage.removeItem('hesa_addas');
    localStorage.removeItem('hesa_users');
    localStorage.removeItem('hesa_session');
    localStorage.removeItem('hesa_application_draft');
    localStorage.removeItem('hesa_active_app_id');
    localStorage.setItem('hesa_applications', JSON.stringify(SAMPLE_APPLICATIONS));
    localStorage.setItem('hesa_addas', JSON.stringify(SAMPLE_ADDAS));
    localStorage.setItem('hesa_users', JSON.stringify(SAMPLE_USERS));
    localStorage.setItem('hesa_session', '9848012345');
    localStorage.setItem('hesa_active_app_id', 'HA-2026-001');
    window.location.reload();
  } catch (e) {
    console.error("Reset error:", e);
    window.location.reload();
  }
}

initializeMockData();
