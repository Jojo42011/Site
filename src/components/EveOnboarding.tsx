import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  MessageCircle, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Sparkles,
  Bot,
  User,
  Clock,
  MapPin,
  Shield,
  Calendar,
  Phone,
  Mail,
  Building2,
  Save
} from 'lucide-react'

interface EveOnboardingProps {
  config: any
  onSave: (field: string, value: any) => void
  onComplete: () => void
  onBack: () => void
  currentStep: any
  currentStepIndex: number
  totalSteps: number
  onNext: () => void
  onPrevious: () => void
  progress: number
}

export function EveOnboarding({
  config,
  onSave,
  onComplete,
  onBack,
  currentStep,
  currentStepIndex,
  totalSteps,
  onNext,
  onPrevious,
  progress
}: EveOnboardingProps) {
  const [inputValue, setInputValue] = useState('')
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [calendarIntegrations, setCalendarIntegrations] = useState<string[]>([])
  const [calendarSetupInstructions, setCalendarSetupInstructions] = useState('')

  // Initialize input values when step changes
  useEffect(() => {
    const fieldValue = getFieldValue()
    if (currentStep.type === 'multiselect') {
      setSelectedOptions(fieldValue || [])
    } else {
      setInputValue(fieldValue || '')
    }
  }, [currentStepIndex, currentStep.field])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputValue(e.target.value)
  }

  const handleMultiSelectToggle = (option: string) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    )
  }

  const handleNext = () => {
    // Save current step data
    if (currentStep.type === 'multiselect') {
      onSave(currentStep.field, selectedOptions)
    } else if (currentStep.type === 'boolean') {
      onSave(currentStep.field, inputValue === 'true')
    } else {
      onSave(currentStep.field, inputValue)
    }

    // Move to next step
    onNext()
  }

  const handleComplete = async () => {
    // Save current step data
    if (currentStep.type === 'multiselect') {
      onSave(currentStep.field, selectedOptions)
    } else if (currentStep.type === 'boolean') {
      onSave(currentStep.field, inputValue === 'true')
    } else {
      onSave(currentStep.field, inputValue)
    }

    // Save calendar integrations if appointment booking is enabled
    if (config.appointment_booking_enabled) {
      onSave('calendar_integrations', calendarIntegrations)
      onSave('calendar_setup_instructions', calendarSetupInstructions)
    }

    // Call onComplete which should redirect to completion message
    onComplete()
  }

  // Save calendar integrations whenever they change
  useEffect(() => {
    if (config.appointment_booking_enabled && calendarIntegrations.length > 0) {
      onSave('calendar_integrations', calendarIntegrations)
    }
  }, [calendarIntegrations, config.appointment_booking_enabled, onSave])

  // Save calendar setup instructions whenever they change
  useEffect(() => {
    if (config.appointment_booking_enabled && calendarSetupInstructions) {
      onSave('calendar_setup_instructions', calendarSetupInstructions)
    }
  }, [calendarSetupInstructions, config.appointment_booking_enabled, onSave])

  const handlePrevious = () => {
    // Save current step data before going back
    if (currentStep.type === 'multiselect') {
      onSave(currentStep.field, selectedOptions)
    } else if (currentStep.type === 'boolean') {
      onSave(currentStep.field, inputValue === 'true')
    } else {
      onSave(currentStep.field, inputValue)
    }

    // Move to previous step
    onPrevious()
  }

  const handleSaveAll = async () => {
    setIsSaving(true)
    
    // Save current step data
    if (currentStep.type === 'multiselect') {
      onSave(currentStep.field, selectedOptions)
    } else if (currentStep.type === 'boolean') {
      onSave(currentStep.field, inputValue === 'true')
    } else {
      onSave(currentStep.field, inputValue)
    }

    // Simulate save delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSaving(false)
    setShowSaveSuccess(true)
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  const getFieldIcon = (field: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      business_name: <Building2 className="h-5 w-5" />,
      business_email: <Mail className="h-5 w-5" />,
      business_phone: <Phone className="h-5 w-5" />,
      company_industry: <Building2 className="h-5 w-5" />,
      voice_tone: <MessageCircle className="h-5 w-5" />,
      operating_hours: <Clock className="h-5 w-5" />,
      company_products: <Sparkles className="h-5 w-5" />,
      company_services: <Sparkles className="h-5 w-5" />,
      service_territories: <MapPin className="h-5 w-5" />,
      appointment_booking_enabled: <Calendar className="h-5 w-5" />,
      website_chat_widget_key: <Bot className="h-5 w-5" />,
      emergency_contact: <Phone className="h-5 w-5" />,
      compliance_guardrails: <Shield className="h-5 w-5" />,
      compliance_scripts: <MessageCircle className="h-5 w-5" />
    }
    return iconMap[field] || <Sparkles className="h-5 w-5" />
  }

  const getFieldValue = () => {
    if (currentStep.type === 'multiselect') {
      return config[currentStep.field] || []
    }
    return config[currentStep.field] || ''
  }

  const renderInput = () => {
    switch (currentStep.type) {
      case 'text':
        return (
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder={currentStep.placeholder}
            className="w-full bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-pink-500/50 focus:ring-pink-500/20 text-lg py-4"
          />
        )

      case 'textarea':
        return (
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            placeholder={currentStep.placeholder}
            rows={4}
            className="w-full bg-slate-800/50 border border-slate-700/50 text-white placeholder:text-slate-400 focus:border-pink-500/50 focus:ring-pink-500/20 rounded-md px-4 py-3 text-lg resize-none"
          />
        )

      case 'select':
        return (
          <div className="space-y-4">
            <select
              value={inputValue}
              onChange={handleSelectChange}
              className="w-full bg-slate-800/50 border border-slate-700/50 text-white rounded-md px-4 py-3 text-lg focus:border-pink-500/50 focus:ring-pink-500/20"
            >
              <option value="">Select an option...</option>
              {currentStep.options?.map((option: string) => (
                <option key={option} value={option}>
                  {option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
            
            {/* Show text input for "other" options */}
            {inputValue === 'other' && (
              <Input
                value={config.company_industry_custom || ''}
                onChange={(e) => onSave('company_industry_custom', e.target.value)}
                placeholder="Please describe your industry..."
                className="w-full bg-slate-800/50 border-slate-700/50 text-white placeholder:text-slate-400 focus:border-pink-500/50 focus:ring-pink-500/20 text-lg py-4"
              />
            )}
          </div>
        )

      case 'multiselect':
        return (
          <div className="space-y-3">
            {currentStep.options?.map((option: string) => (
              <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors cursor-pointer border border-slate-700/30">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleMultiSelectToggle(option)}
                  className="rounded border-slate-600 bg-slate-800 text-pink-500 focus:ring-pink-500/20 focus:ring-offset-slate-900 h-5 w-5"
                />
                <span className="text-sm text-slate-200">{option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </label>
            ))}
          </div>
        )

      case 'boolean':
        return (
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors cursor-pointer border border-slate-700/30">
              <input
                type="radio"
                name="boolean-option"
                value="true"
                checked={inputValue === 'true'}
                onChange={(e) => setInputValue(e.target.value)}
                className="border-slate-600 bg-slate-800 text-pink-500 focus:ring-pink-500/20 focus:ring-offset-slate-900"
              />
              <span className="text-slate-200 text-lg">Yes, enable this feature</span>
            </label>
            <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors cursor-pointer border border-slate-700/30">
              <input
                type="radio"
                name="boolean-option"
                value="false"
                checked={inputValue === 'false'}
                onChange={(e) => setInputValue(e.target.value)}
                className="border-slate-600 bg-slate-800 text-pink-500 focus:ring-pink-500/20 focus:ring-offset-slate-900"
              />
              <span className="text-slate-200 text-lg">No, not at this time</span>
            </label>
            
            {/* Show calendar integration popup when appointment booking is enabled */}
            {inputValue === 'true' && currentStep.field === 'appointment_booking_enabled' && (
              <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                <h4 className="text-lg font-semibold text-white mb-3">Calendar Integration</h4>
                <p className="text-slate-300 mb-4">Which calendar systems would you like me to integrate with?</p>
                
                <div className="space-y-3 mb-4">
                  {['google_calendar', 'outlook_calendar', 'calendly', 'acuity_scheduling', 'square_appointments'].map((option) => (
                    <label key={option} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/30 transition-colors cursor-pointer border border-slate-600/30">
                      <input
                        type="checkbox"
                        checked={calendarIntegrations.includes(option)}
                        onChange={() => {
                          if (calendarIntegrations.includes(option)) {
                            setCalendarIntegrations(prev => prev.filter(o => o !== option))
                          } else {
                            setCalendarIntegrations(prev => [...prev, option])
                          }
                        }}
                        className="rounded border-slate-600 bg-slate-800 text-pink-500 focus:ring-pink-500/20 focus:ring-offset-slate-900 h-5 w-5"
                      />
                      <span className="text-sm text-slate-200">{option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    </label>
                  ))}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Setup Instructions</label>
                  <textarea
                    value={calendarSetupInstructions}
                    onChange={(e) => setCalendarSetupInstructions(e.target.value)}
                    placeholder="e.g., Google Calendar API key: xxxxx, or Calendly link: https://calendly.com/yourbusiness"
                    rows={3}
                    className="w-full bg-slate-800/50 border border-slate-700/50 text-white placeholder:text-slate-400 focus:border-pink-500/50 focus:ring-pink-500/20 rounded-md px-3 py-2 resize-none"
                  />
                </div>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    if (currentStep.required) {
      if (currentStep.type === 'multiselect') {
        return selectedOptions.length > 0
      }
      if (currentStep.type === 'boolean') {
        return inputValue !== ''
      }
      return inputValue !== ''
    }
    return true
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Eve Configuration</h1>
              <p className="text-slate-400 text-sm">Let's get to know your business</p>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-400">Step {currentStepIndex + 1} of {totalSteps}</span>
            <span className="text-sm text-slate-400">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Save Success Message */}
        <AnimatePresence>
          {showSaveSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6 bg-green-500/20 border border-green-500/40 rounded-lg p-4 text-center"
            >
              <div className="flex items-center justify-center gap-2 text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Configuration saved successfully!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Interface */}
        <div className="bg-slate-900/50 rounded-2xl p-8 border border-slate-700/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Eve's Question */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      {getFieldIcon(currentStep.field)}
                      <Badge variant="secondary" className="bg-pink-500/20 text-pink-300 border-pink-500/40">
                        {currentStep.required ? 'Required' : 'Optional'}
                      </Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-3">{currentStep.question}</h2>
                    <p className="text-slate-300 text-lg leading-relaxed">{currentStep.explanation}</p>
                  </div>
                </div>
              </div>

              {/* User's Response */}
              <div className="flex items-start gap-4 justify-end">
                <div className="flex-1 max-w-2xl">
                  <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-500/30">
                    {renderInput()}
                  </div>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-700/50">
            <Button
              onClick={handlePrevious}
              disabled={currentStepIndex === 0}
              variant="outline"
              className="border-slate-700/50 text-slate-300 hover:bg-slate-800/50 hover:border-slate-600/50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-3">
              {/* Save Button - Always visible */}
              <Button
                onClick={handleSaveAll}
                disabled={isSaving}
                variant="outline"
                className="border-green-500/50 text-green-300 hover:bg-green-500/10 hover:border-green-500/70"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Progress'}
              </Button>

              {currentStepIndex === totalSteps - 1 ? (
                <Button
                  onClick={handleComplete}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-8 py-3"
                >
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Complete Setup
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-8 py-3"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            💡 Don't worry about being perfect - you can always update these settings later from your dashboard.
          </p>
        </div>
      </div>
    </div>
  )
}
