import { storage } from "./storage.js";

async function setupSampleData() {
  console.log("Setting up sample data for Poorvam Care...");

  try {
    // Create admin user
    const admin = await storage.createUser({
      email: "admin@poorvam-care.com",
      password: "admin123",
      role: "admin",
      firstName: "Admin",
      lastName: "User",
      phone: "+919876543210"
    });
    console.log("✅ Created admin user:", admin.email);

    // Create therapist users
    const therapist1 = await storage.createUser({
      email: "pooja.jaiswal@poorvam-care.com",
      password: "therapist123",
      role: "therapist",
      firstName: "Pooja",
      lastName: "Jaiswal",
      phone: "+919876543211"
    });
    console.log("✅ Created therapist:", therapist1.email);

    const therapist2 = await storage.createUser({
      email: "niranjana.devi@poorvam-care.com",
      password: "therapist123",
      role: "therapist",
      firstName: "Niranjana",
      lastName: "Devi",
      phone: "+919876543212"
    });
    console.log("✅ Created therapist:", therapist2.email);

    const therapist3 = await storage.createUser({
      email: "mariappan.n@poorvam-care.com",
      password: "therapist123",
      role: "therapist",
      firstName: "Mariappan",
      lastName: "N",
      phone: "+919876543213"
    });
    console.log("✅ Created therapist:", therapist3.email);

    // Create parent users
    const parent1 = await storage.createUser({
      email: "parent1@example.com",
      password: "parent123",
      role: "parent",
      firstName: "Parent",
      lastName: "One",
      phone: "+919876543214"
    });
    console.log("✅ Created parent:", parent1.email);

    const parent2 = await storage.createUser({
      email: "parent2@example.com",
      password: "parent123",
      role: "parent",
      firstName: "Parent",
      lastName: "Two",
      phone: "+919876543215"
    });
    console.log("✅ Created parent:", parent2.email);

    // Create service types
    const speechTherapy = await storage.createServiceType({
      name: "Speech Therapy",
      description: "Treatment for speech and language disorders",
      defaultDuration: 45,
      color: "#3B82F6",
      isActive: true
    });
    console.log("✅ Created service type:", speechTherapy.name);

    const occupationalTherapy = await storage.createServiceType({
      name: "Occupational Therapy",
      description: "Improving daily living skills and motor functions",
      defaultDuration: 60,
      color: "#10B981",
      isActive: true
    });
    console.log("✅ Created service type:", occupationalTherapy.name);

    const behavioralTherapy = await storage.createServiceType({
      name: "Behavioral Therapy",
      description: "Addressing behavioral challenges and social skills",
      defaultDuration: 60,
      color: "#F59E0B",
      isActive: true
    });
    console.log("✅ Created service type:", behavioralTherapy.name);

    const groupTherapy = await storage.createServiceType({
      name: "Group Therapy",
      description: "Therapy sessions with multiple children",
      defaultDuration: 90,
      color: "#8B5CF6",
      isActive: true
    });
    console.log("✅ Created service type:", groupTherapy.name);

    // Create patients
    const patient1 = await storage.createPatient({
      firstName: "Ram",
      lastName: "A",
      email: "ram@example.com",
      phone: "+919108486123",
      dateOfBirth: new Date("2018-05-15"),
      parentId: parent1.id,
      primaryTherapistId: therapist1.id,
      status: "active",
      diagnosis: "Speech Delay",
      notes: "Patient shows improvement in communication skills"
    });
    console.log("✅ Created patient:", `${patient1.firstName} ${patient1.lastName}`);

    const patient2 = await storage.createPatient({
      firstName: "Takshaarya",
      lastName: "A",
      email: "takshaarya@example.com",
      phone: "+919600455983",
      dateOfBirth: new Date("2019-03-22"),
      parentId: parent2.id,
      primaryTherapistId: therapist2.id,
      status: "active",
      diagnosis: "Occupational Therapy",
      notes: "Working on fine motor skills"
    });
    console.log("✅ Created patient:", `${patient2.firstName} ${patient2.lastName}`);

    const patient3 = await storage.createPatient({
      firstName: "Daivik",
      lastName: "A",
      email: "daivik@example.com",
      phone: "+919876543216",
      dateOfBirth: new Date("2020-01-10"),
      parentId: parent1.id,
      primaryTherapistId: therapist1.id,
      status: "active",
      diagnosis: "Hearing Assessment",
      notes: "Scheduled for hearing evaluation"
    });
    console.log("✅ Created patient:", `${patient3.firstName} ${patient3.lastName}`);

    const patient4 = await storage.createPatient({
      firstName: "Aaradhana",
      lastName: "B",
      email: "aaradhana@example.com",
      phone: "+919876543217",
      dateOfBirth: new Date("2017-08-12"),
      parentId: parent2.id,
      primaryTherapistId: therapist3.id,
      status: "active",
      diagnosis: "Behavioral Therapy",
      notes: "Working on social interaction skills"
    });
    console.log("✅ Created patient:", `${patient4.firstName} ${patient4.lastName}`);

    // Create recurring pattern for weekly appointments
    const weeklyPattern = await storage.createRecurringPattern({
      frequency: "weekly",
      interval: 1,
      daysOfWeek: [1, 3, 5], // Monday, Wednesday, Friday
      endDate: new Date("2025-03-31"),
      maxOccurrences: 12
    });
    console.log("✅ Created recurring pattern: Weekly");

    // Create appointments
    const appointment1 = await storage.createAppointment({
      patientId: patient1.id,
      therapistId: therapist1.id,
      serviceTypeId: speechTherapy.id,
      scheduledAt: new Date("2024-12-20T10:00:00"),
      duration: 45,
      status: "scheduled",
      isRecurring: true,
      recurringPatternId: weeklyPattern.id,
      notes: "Focus on articulation exercises"
    });
    console.log("✅ Created appointment for:", patient1.firstName);

    const appointment2 = await storage.createAppointment({
      patientId: patient2.id,
      therapistId: therapist2.id,
      serviceTypeId: occupationalTherapy.id,
      scheduledAt: new Date("2024-12-20T14:00:00"),
      duration: 60,
      status: "scheduled",
      notes: "Fine motor skill development"
    });
    console.log("✅ Created appointment for:", patient2.firstName);

    const appointment3 = await storage.createAppointment({
      patientId: patient3.id,
      therapistId: therapist1.id,
      serviceTypeId: speechTherapy.id,
      scheduledAt: new Date("2024-12-20T15:00:00"),
      duration: 45,
      status: "scheduled",
      notes: "Hearing assessment and speech evaluation"
    });
    console.log("✅ Created appointment for:", patient3.firstName);

    // Create group therapy appointment with multiple patients
    const groupAppointment = await storage.createAppointment({
      patientId: patient1.id, // Primary patient
      therapistId: therapist3.id,
      serviceTypeId: groupTherapy.id,
      scheduledAt: new Date("2024-12-21T10:00:00"),
      duration: 90,
      status: "scheduled",
      notes: "Group therapy session for social skills"
    });
    console.log("✅ Created group appointment");

    // Add multiple patients to group appointment
    await storage.addPatientToAppointment(groupAppointment.id, patient1.id, true);
    await storage.addPatientToAppointment(groupAppointment.id, patient2.id, false);
    await storage.addPatientToAppointment(groupAppointment.id, patient4.id, false);
    console.log("✅ Added multiple patients to group appointment");

    // Create sessions
    const session1 = await storage.createSession({
      appointmentId: appointment1.id,
      therapistId: therapist1.id,
      patientId: patient1.id,
      sessionDate: new Date("2024-12-19T10:00:00"),
      notes: "Good progress with vowel sounds",
      progress: "Patient is responding well to therapy",
      goals: "Improve articulation of 'r' and 'l' sounds"
    });
    console.log("✅ Created session for:", patient1.firstName);

    const session2 = await storage.createSession({
      appointmentId: appointment2.id,
      therapistId: therapist2.id,
      patientId: patient2.id,
      sessionDate: new Date("2024-12-18T14:00:00"),
      notes: "Excellent progress with fine motor skills",
      progress: "Patient can now hold pencil correctly",
      goals: "Improve handwriting and coordination"
    });
    console.log("✅ Created session for:", patient2.firstName);

    // Create goals
    const goal1 = await storage.createGoal({
      patientId: patient1.id,
      title: "Improve Speech Clarity",
      description: "Work on clear pronunciation of words",
      status: "active",
      targetDate: new Date("2025-03-01")
    });
    console.log("✅ Created goal for:", patient1.firstName);

    const goal2 = await storage.createGoal({
      patientId: patient2.id,
      title: "Enhance Fine Motor Skills",
      description: "Improve hand-eye coordination and dexterity",
      status: "active",
      targetDate: new Date("2025-02-15")
    });
    console.log("✅ Created goal for:", patient2.firstName);

    const goal3 = await storage.createGoal({
      patientId: patient4.id,
      title: "Develop Social Skills",
      description: "Improve interaction with peers and adults",
      status: "active",
      targetDate: new Date("2025-04-01")
    });
    console.log("✅ Created goal for:", patient4.firstName);

    // Create tasks
    const task1 = await storage.createTask({
      patientId: patient1.id,
      assignedTo: therapist1.id,
      title: "Daily Speech Exercises",
      description: "Practice vowel sounds for 15 minutes daily",
      status: "pending",
      dueDate: new Date("2024-12-25")
    });
    console.log("✅ Created task for:", patient1.firstName);

    const task2 = await storage.createTask({
      patientId: patient2.id,
      assignedTo: therapist2.id,
      title: "Occupational Therapy Assessment",
      description: "Complete fine motor skills assessment",
      status: "pending",
      dueDate: new Date("2024-12-22")
    });
    console.log("✅ Created task for:", patient2.firstName);

    const task3 = await storage.createTask({
      patientId: patient4.id,
      assignedTo: therapist3.id,
      title: "Behavioral Observation",
      description: "Observe social interactions in group setting",
      status: "pending",
      dueDate: new Date("2024-12-23")
    });
    console.log("✅ Created task for:", patient4.firstName);

    console.log("\n🎉 Sample data setup completed successfully!");
    console.log("\n📋 Login Credentials:");
    console.log("Admin: admin@poorvam-care.com / admin123");
    console.log("Therapist 1: pooja.jaiswal@poorvam-care.com / therapist123");
    console.log("Therapist 2: niranjana.devi@poorvam-care.com / therapist123");
    console.log("Therapist 3: mariappan.n@poorvam-care.com / therapist123");
    console.log("Parent 1: parent1@example.com / parent123");
    console.log("Parent 2: parent2@example.com / parent123");

    console.log("\n🏥 Service Types Created:");
    console.log("- Speech Therapy (45 min, Blue)");
    console.log("- Occupational Therapy (60 min, Green)");
    console.log("- Behavioral Therapy (60 min, Orange)");
    console.log("- Group Therapy (90 min, Purple)");

    console.log("\n👥 Patients Created:");
    console.log("- Ram A (Speech Therapy)");
    console.log("- Takshaarya A (Occupational Therapy)");
    console.log("- Daivik A (Hearing Assessment)");
    console.log("- Aaradhana B (Behavioral Therapy)");

    console.log("\n📅 Sample Appointments:");
    console.log("- Individual appointments for each patient");
    console.log("- Group therapy session with multiple patients");
    console.log("- Recurring weekly appointments");

  } catch (error) {
    console.error("❌ Error setting up sample data:", error);
  }
}

setupSampleData(); 