/**
 * Form validation utilities
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

/**
 * Email validation
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * URL validation
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Phone validation
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
};

/**
 * Profile validation
 */
export const validateProfile = (data: any): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.name?.trim()) {
    errors.push({ field: "name", message: "Name is required" });
  }

  if (!data.email?.trim()) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!isValidEmail(data.email)) {
    errors.push({ field: "email", message: "Invalid email address" });
  }

  if (data.phone?.trim() && !isValidPhone(data.phone)) {
    errors.push({ field: "phone", message: "Invalid phone number" });
  }

  if (!data.role?.trim()) {
    errors.push({ field: "role", message: "Role is required" });
  }

  if (data.yearsOfExperience !== undefined && data.yearsOfExperience < 0) {
    errors.push({
      field: "yearsOfExperience",
      message: "Years must be a positive number",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Skill validation
 */
export const validateSkill = (data: any): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.name?.trim()) {
    errors.push({ field: "name", message: "Skill name is required" });
  }

  if (!data.category?.trim()) {
    errors.push({ field: "category", message: "Category is required" });
  }

  if (!data.level || data.level < 0 || data.level > 100) {
    errors.push({ field: "level", message: "Level must be between 0 and 100" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Project validation
 */
export const validateProject = (data: any): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.title?.trim()) {
    errors.push({ field: "title", message: "Project title is required" });
  }

  if (!data.description?.trim()) {
    errors.push({ field: "description", message: "Description is required" });
  }

  if (data.imageUrl?.trim() && !isValidUrl(data.imageUrl)) {
    errors.push({ field: "imageUrl", message: "Invalid image URL" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Experience validation
 */
export const validateExperience = (data: any): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.company?.trim()) {
    errors.push({ field: "company", message: "Company name is required" });
  }

  if (!data.position?.trim()) {
    errors.push({ field: "position", message: "Position is required" });
  }

  if (!data.startDate?.trim()) {
    errors.push({ field: "startDate", message: "Start date is required" });
  }

  if (!data.endDate?.trim()) {
    errors.push({ field: "endDate", message: "End date is required" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Education validation
 */
export const validateEducation = (data: any): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.school?.trim()) {
    errors.push({ field: "school", message: "School name is required" });
  }

  if (!data.degree?.trim()) {
    errors.push({ field: "degree", message: "Degree is required" });
  }

  if (!data.field?.trim()) {
    errors.push({ field: "field", message: "Field of study is required" });
  }

  if (!data.startDate?.trim()) {
    errors.push({ field: "startDate", message: "Start date is required" });
  }

  if (!data.endDate?.trim()) {
    errors.push({ field: "endDate", message: "End date is required" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Certification validation
 */
export const validateCertification = (data: any): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.name?.trim()) {
    errors.push({ field: "name", message: "Certification name is required" });
  }

  if (!data.issuer?.trim()) {
    errors.push({ field: "issuer", message: "Issuer is required" });
  }

  if (!data.issuedDate?.trim()) {
    errors.push({ field: "issuedDate", message: "Issued date is required" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Testimonial validation
 */
export const validateTestimonial = (data: any): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.author?.trim()) {
    errors.push({ field: "author", message: "Author name is required" });
  }

  if (!data.content?.trim()) {
    errors.push({
      field: "content",
      message: "Testimonial content is required",
    });
  }

  if (data.content?.trim().length < 10) {
    errors.push({
      field: "content",
      message: "Testimonial must be at least 10 characters",
    });
  }

  if (!data.rating || data.rating < 1 || data.rating > 5) {
    errors.push({ field: "rating", message: "Rating must be between 1 and 5" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Blog post validation
 */
export const validateBlogPost = (data: any): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.title?.trim()) {
    errors.push({ field: "title", message: "Blog title is required" });
  }

  if (!data.description?.trim()) {
    errors.push({ field: "description", message: "Description is required" });
  }

  if (!data.url?.trim()) {
    errors.push({ field: "url", message: "URL is required" });
  } else if (!isValidUrl(data.url)) {
    errors.push({ field: "url", message: "Invalid URL" });
  }

  if (!data.category?.trim()) {
    errors.push({ field: "category", message: "Category is required" });
  }

  if (data.imageUrl?.trim() && !isValidUrl(data.imageUrl)) {
    errors.push({ field: "imageUrl", message: "Invalid image URL" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Contact message validation
 */
export const validateContactMessage = (data: any): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.visitorName?.trim()) {
    errors.push({ field: "visitorName", message: "Name is required" });
  }

  if (!data.visitorEmail?.trim()) {
    errors.push({ field: "visitorEmail", message: "Email is required" });
  } else if (!isValidEmail(data.visitorEmail)) {
    errors.push({ field: "visitorEmail", message: "Invalid email address" });
  }

  if (!data.message?.trim()) {
    errors.push({ field: "message", message: "Message is required" });
  }

  if (data.message?.trim().length < 5) {
    errors.push({
      field: "message",
      message: "Message must be at least 5 characters",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Terminal command validation
 */
export const validateTerminalCommand = (data: any): ValidationResult => {
  const errors: ValidationError[] = [];

  if (!data.command?.trim()) {
    errors.push({ field: "command", message: "Command is required" });
  }

  if (!data.description?.trim()) {
    errors.push({ field: "description", message: "Description is required" });
  }

  if (!data.output?.trim()) {
    errors.push({ field: "output", message: "Output is required" });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
