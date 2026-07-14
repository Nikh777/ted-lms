import React from 'react';
import { ComplianceDocumentation } from './ComplianceDocumentation';

const termsData = [
  {
    id: "permits",
    index: "01",
    title: "PLATFORM USAGE TERMINAL PERMITS",
    blocks: [
      "By triggering source queries and script compilations on the TED infrastructure networks, you explicitly assert that no infinite recursion execution vectors or malicious brute memory leaks will be deliberately initialized.",
      "Any unauthorized deep reverse-engineering payloads targeting core compiler components or internal layout routing endpoints violate computational use guidelines."
    ]
  },
  {
    id: "termination",
    index: "02",
    title: "COMPUTATIONAL ACCESS SHUTDOWN PROTOCOL",
    blocks: [
      "TED preserves total operational control to terminate active socket routes instantly if anomalies, server stress configurations, or unauthorized multi-tenant injections emerge from specific regional networks."
    ]
  }
];

export const TermsOfServicePage = () => (
  <ComplianceDocumentation 
    pageTitle="Terms of Service" 
    metaData="LEGAL_SCOPE: USER_AGREEMENT_VALID" 
    sections={termsData} 
  />
);

export default TermsOfServicePage;