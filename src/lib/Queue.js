import Bee from 'bee-queue';
import SubscriptionMail from '../app/jobs/SubscriptionMail';
import redisConfig from '../config/redis';

// Create an array containing all the app jobs
const jobs = [SubscriptionMail];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  // This method will connect to the database and load the jobs
  init() {
    // For each job, it will connect to the database and add the job to the queue
    jobs.forEach(({ key, handle }) => {
      // Create a queue and set the connection to the database
      const bee = new Bee(key, { redis: redisConfig });
      // Add the queue and its task to the set of queues
      this.queues[key] = { bee, handle };
    });
  }

  // Add new tasks to the queue
  add(queue, job) {
    /*
     * Access the queue of the current job, create a job sending the info that
     * will be used on handle method, and save it
     */
    return this.queues[queue].bee.createJob(job).save();
  }

  // Execute the tasks of the queue
  processQueue() {
    jobs.forEach(job => {
      // Access the current queue and the task from the set of queues
      const { bee, handle } = this.queues[job.key];
      // Process the queue
      bee.process(handle);
    });
  }
}

export default new Queue();
