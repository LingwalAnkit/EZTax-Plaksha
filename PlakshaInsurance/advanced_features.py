import pandas as pd
import plotly.graph_objects as go
import plotly.express as px

class AdvancedInsuranceFeatures:
    def __init__(self):
        self.policy_database = {
            'HDFC Click 2 Protect Plus': {
                'rating': 4.5,
                'claim_ratio': 98.5,
                'features': ['Online purchase', 'Terminal illness', 'Accidental death benefit'],
                'premium_factor': 1.0
            },
            'LIC Tech Term': {
                'rating': 4.3,
                'claim_ratio': 97.8,
                'features': ['Trusted brand', 'Flexible payment', 'Special rates for women'],
                'premium_factor': 1.1
            },
            'ICICI Pru iProtect Smart': {
                'rating': 4.4,
                'claim_ratio': 96.2,
                'features': ['Health checkup waiver', 'Premium waiver', 'Return of premium'],
                'premium_factor': 0.95
            }
        }
    
    def generate_comparison_chart(self, policies_data):
        """Generate interactive comparison chart"""
        fig = go.Figure()
        
        policies = list(policies_data.keys())
        premiums = [policies_data[p]['premium'] for p in policies]
        ratings = [self.policy_database[p]['rating'] for p in policies]
        
        fig.add_trace(go.Scatter(
            x=premiums,
            y=ratings,
            mode='markers+text',
            text=policies,
            textposition="top center",
            marker=dict(size=15, color='lightblue')
        ))
        
        fig.update_layout(
            title='Policy Comparison: Premium vs Rating',
            xaxis_title='Annual Premium (₹)',
            yaxis_title='Rating',
            height=400
        )
        
        return fig
    
    def risk_assessment(self, age, income, lifestyle):
        """AI-powered risk assessment"""
        risk_score = 0
        
        # Age factor
        if age < 25: risk_score += 1
        elif age < 35: risk_score += 2
        elif age < 45: risk_score += 3
        else: risk_score += 4
        
        # Income factor
        if income < 25000: risk_score += 1
        elif income < 50000: risk_score += 2
        else: risk_score += 3
        
        # Lifestyle factor
        lifestyle_scores = {
            'sedentary': 3,
            'moderate': 2,
            'active': 1
        }
        risk_score += lifestyle_scores.get(lifestyle, 2)
        
        return {
            'score': risk_score,
            'level': 'Low' if risk_score <= 4 else 'Medium' if risk_score <= 7 else 'High',
            'recommendations': self.get_risk_recommendations(risk_score)
        }
    
    def get_risk_recommendations(self, score):
        if score <= 4:
            return ["Standard coverage sufficient", "Consider basic health riders"]
        elif score <= 7:
            return ["Consider higher coverage", "Add critical illness rider", "Regular health checkups"]
        else:
            return ["Maximum coverage recommended", "Multiple riders essential", "Immediate policy purchase advised"]