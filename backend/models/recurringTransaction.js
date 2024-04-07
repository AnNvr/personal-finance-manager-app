/*  Purpose:
    For managing recurring expenses or incomes (e.g., monthly rent, annual subscriptions).

    Fields:
    RelatedTransaction (Reference to Transaction model),
    Frequency (Enum: ['Daily', 'Weekly', 'Monthly', 'Annually']),
    NextOccurrence (Date),
    User (Reference to User model). */