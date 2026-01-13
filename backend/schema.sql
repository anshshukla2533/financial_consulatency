-- Users Table (Both Clients and CAs)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(15) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    user_type ENUM('client', 'ca') NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Client Profile
CREATE TABLE client_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    pan_number VARCHAR(10) UNIQUE,
    aadhaar_number_encrypted TEXT, -- Encrypted storage
    date_of_birth DATE,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(6),
    preferred_language VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CA Profile
CREATE TABLE ca_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    ca_membership_number VARCHAR(50) UNIQUE NOT NULL,
    firm_name VARCHAR(255),
    years_of_experience INT,
    specializations TEXT[], -- Array of specializations
    languages TEXT[], -- Array of languages spoken
    base_price DECIMAL(10, 2),
    rating DECIMAL(3, 2) DEFAULT 0.00,
    total_reviews INT DEFAULT 0,
    total_filings INT DEFAULT 0,
    turnaround_time_hours INT, -- 24, 72, etc.
    bio TEXT,
    profile_image_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_available BOOLEAN DEFAULT TRUE,
    city VARCHAR(100),
    state VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CA Documents (for verification)
CREATE TABLE ca_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ca_profile_id UUID REFERENCES ca_profiles(id) ON DELETE CASCADE,
    document_type ENUM('membership_certificate', 'identity_proof', 'address_proof', 'other') NOT NULL,
    document_url TEXT NOT NULL,
    verification_status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP
);

-- ITR Requests
CREATE TABLE itr_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES users(id) ON DELETE CASCADE,
    ca_id UUID REFERENCES users(id) ON DELETE SET NULL,
    
    -- Income Details
    income_type ENUM('salary', 'freelance', 'business', 'student', 'farmer', 'other') NOT NULL,
    income_amount DECIMAL(15, 2) NOT NULL,
    financial_year VARCHAR(10) NOT NULL, -- e.g., "2023-24"
    
    -- Form Detection
    itr_form_type VARCHAR(20), -- ITR-1, ITR-2, ITR-3, ITR-4
    tax_status ENUM('refund', 'due', 'nil') DEFAULT 'nil',
    estimated_refund DECIMAL(15, 2),
    estimated_tax_due DECIMAL(15, 2),
    
    -- Request Status
    status ENUM('draft', 'ca_search', 'ca_assigned', 'documents_pending', 'in_progress', 'filed', 'completed', 'cancelled') DEFAULT 'draft',
    
    -- Pricing
    quoted_price DECIMAL(10, 2),
    platform_fee DECIMAL(10, 2),
    ca_earnings DECIMAL(10, 2),
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    assigned_at TIMESTAMP,
    filed_at TIMESTAMP,
    completed_at TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Investment Details
CREATE TABLE investment_details (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    itr_request_id UUID REFERENCES itr_requests(id) ON DELETE CASCADE,
    investment_type ENUM('lic', 'ppf', 'fd', 'elss', 'nps', 'home_loan', 'education_loan', 'other') NOT NULL,
    investment_name VARCHAR(255),
    amount DECIMAL(15, 2) NOT NULL,
    policy_number VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bank Account Details
CREATE TABLE bank_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    client_id UUID REFERENCES users(id) ON DELETE CASCADE,
    account_holder_name VARCHAR(255) NOT NULL,
    account_number_encrypted TEXT NOT NULL,
    ifsc_code VARCHAR(11) NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
    branch_name VARCHAR(255),
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Documents
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    itr_request_id UUID REFERENCES itr_requests(id) ON DELETE CASCADE,
    uploaded_by UUID REFERENCES users(id),
    document_type ENUM('form16', 'salary_slip', 'bank_statement', 'investment_proof', 'aadhaar', 'pan', 'itr_filed', 'acknowledgement', 'other') NOT NULL,
    document_name VARCHAR(255) NOT NULL,
    document_url TEXT NOT NULL,
    file_size_kb INT,
    is_verified BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CA Applications (when CA shows interest)
CREATE TABLE ca_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    itr_request_id UUID REFERENCES itr_requests(id) ON DELETE CASCADE,
    ca_id UUID REFERENCES users(id) ON DELETE CASCADE,
    quoted_price DECIMAL(10, 2) NOT NULL,
    estimated_completion_hours INT,
    message TEXT,
    status ENUM('pending', 'accepted', 'rejected', 'withdrawn') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(itr_request_id, ca_id)
);

-- Payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    itr_request_id UUID REFERENCES itr_requests(id) ON DELETE CASCADE,
    client_id UUID REFERENCES users(id) ON DELETE CASCADE,
    ca_id UUID REFERENCES users(id),
    
    amount DECIMAL(10, 2) NOT NULL,
    platform_fee DECIMAL(10, 2) NOT NULL,
    ca_earnings DECIMAL(10, 2) NOT NULL,
    
    payment_method ENUM('upi', 'card', 'netbanking', 'wallet') NOT NULL,
    payment_gateway VARCHAR(50), -- razorpay, stripe, etc.
    transaction_id VARCHAR(255) UNIQUE,
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    
    paid_at TIMESTAMP,
    refunded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chat Messages
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    itr_request_id UUID REFERENCES itr_requests(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    attachment_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reviews and Ratings
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    itr_request_id UUID REFERENCES itr_requests(id) ON DELETE CASCADE,
    client_id UUID REFERENCES users(id) ON DELETE CASCADE,
    ca_id UUID REFERENCES users(id) ON DELETE CASCADE,
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    review_text TEXT,
    response_time_rating INT CHECK (response_time_rating >= 1 AND response_time_rating <= 5),
    professionalism_rating INT CHECK (professionalism_rating >= 1 AND professionalism_rating <= 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Notifications
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type ENUM('itr_update', 'payment', 'message', 'review', 'document', 'system') NOT NULL,
    related_id UUID, -- Can reference itr_request, payment, etc.
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CA Earnings Withdrawals
CREATE TABLE ca_withdrawals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ca_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    bank_account_id UUID,
    status ENUM('pending', 'processing', 'completed', 'failed') DEFAULT 'pending',
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP
);

-- System Configuration
CREATE TABLE system_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    config_key VARCHAR(100) UNIQUE NOT NULL,
    config_value TEXT NOT NULL,
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_user_type ON users(user_type);
CREATE INDEX idx_itr_requests_client_id ON itr_requests(client_id);
CREATE INDEX idx_itr_requests_ca_id ON itr_requests(ca_id);
CREATE INDEX idx_itr_requests_status ON itr_requests(status);
CREATE INDEX idx_ca_profiles_rating ON ca_profiles(rating DESC);
CREATE INDEX idx_ca_profiles_is_available ON ca_profiles(is_available);
CREATE INDEX idx_chat_messages_itr_request ON chat_messages(itr_request_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id, is_read);