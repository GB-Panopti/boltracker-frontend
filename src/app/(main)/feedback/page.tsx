'use client';

import { Button } from '@/components/Button';
import { cx, focusRing } from '@/lib/utils';
import MetaService from '@/services/MetaService';
import { RiSpeakLine, RiStarFill, RiStarLine } from '@remixicon/react';
import { Callout, Divider, Select, SelectItem, Textarea, TextInput } from '@tremor/react';
import { useState } from 'react';

export default function Example() {
    const [formData, setFormData] = useState({
      feedback: '',
      name: '',
      email: '',
      rating: '',
    });
    const [error, setError] = useState('');
  
    const handleChange = (e: { name?: any; value?: any; target?: any; }) => {
        // Handle custom events
        if (e?.target === undefined) {
            const { name, value } = e;
            setFormData({
                ...formData,
                [name]: value,
            });
        } else {
            // Handle standard form events
            const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
  
    function handleFeedbackForm(event: { preventDefault: () => void; }) {
        event.preventDefault();
    
        try {
            setError('Sending feedback..');
            MetaService.sendFeedback(formData);
            window.location.reload();
        } catch (error) {
            console.error('Failed to send feedback:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    }
    

  return (
    <>
      <div className="sm:mx-auto sm:max-w-2xl">
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong flex">
          <RiSpeakLine
                className="ml-1 mr-2 size-6 shrink-0 text-gray-800"
                aria-hidden="true"/>
          Give feedback or suggestions
        </h3>
        <Divider className="mt-2 border-t border-tremor-content dark:border-dark-tremor-content"/>
        {/* <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
          Thank you for taking a moment to let us know what you think! We appreciate your feedback.
        </p> */}
        <Callout title="Thank you!" color="teal">
            Thank you for taking a moment to let us know what you think! We truly appreciate your feedback and will use it to further improve <span className='font-semibold'>Panopti</span>.
        </Callout>
        <form onSubmit={handleFeedbackForm} className="mt-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <label
                htmlFor="name"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Your name
                <span className="text-red-500">*</span>
              </label>
              <TextInput
                type="text"
                id="name"
                name="name"
                autoComplete="first-name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={cx(
                    "overflow-y-auto rounded-md border mt-2 border-gray-200 dark:border-gray-900 bg-white dark:bg-[#090E1A]",
                    focusRing,
                    )}
                required
              />
            </div>
            <div className="col-span-full  sm:col-span-3">
              <label
                htmlFor="email"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Email we may use to contact you
              </label>
              <TextInput
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={cx(
                    "overflow-y-auto rounded-md border mt-2",
                    "border-gray-200 dark:border-gray-900",
                    "bg-white dark:bg-[#090E1A]",
                    focusRing,
                    )}
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="rating"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                How would you rate your experience with Panopti?
                <span className="text-red-500">*</span>
              </label>
            <Select id="rating" name="rating" 
                value={formData.rating}
                onChange={(value) => handleChange({ name: 'rating', value })}
                className={cx(
                    "rounded-md border mt-2 border-gray-200 dark:border-gray-900 bg-white dark:bg-[#090E1A]",
                    focusRing,
                )}>
                <SelectItem value="1" className="bg-white dark:bg-[#090E1A] w-full ">
                    <div className="flex space-x-1">
                        <RiStarFill className="mt-1 size-4" /><RiStarLine className="mt-1 size-4" /><RiStarLine className="mt-1 size-4" /><RiStarLine className="mt-1 size-4" /><RiStarLine className="mt-1 size-4" /> 
                        <span className="ml-2">Bad</span>
                    </div>
                </SelectItem>
                <SelectItem value="2" className="bg-white dark:bg-[#090E1A]">
                    <div className="flex space-x-1">
                        <RiStarFill className="mt-1 size-4" /><RiStarFill className="mt-1 size-4" /><RiStarLine className="mt-1 size-4" /><RiStarLine className="mt-1 size-4" /><RiStarLine className="mt-1 size-4" /> 
                        <span className="ml-2">Underwhelming</span>
                    </div>
                </SelectItem> 
                <SelectItem value="3" className="bg-white dark:bg-[#090E1A]">
                    <div className="flex space-x-1">
                        <RiStarFill className="mt-1 size-4" /><RiStarFill className="mt-1 size-4" /><RiStarFill className="mt-1 size-4" /><RiStarLine className="mt-1 size-4" /><RiStarLine className="mt-1 size-4" /> 
                        <span className="ml-2">Ok</span>
                    </div>
                </SelectItem> 
                <SelectItem value="4" className="bg-white dark:bg-[#090E1A]">
                    <div className="flex space-x-1">
                        <RiStarFill className="mt-1 size-4" /><RiStarFill className="mt-1 size-4" /><RiStarFill className="mt-1 size-4" /><RiStarFill className="mt-1 size-4" /><RiStarLine className="mt-1 size-4" /> 
                        <span className="ml-2">Good</span>
                    </div>
                </SelectItem> 
                <SelectItem value="5" className="bg-white dark:bg-[#090E1A]">
                    <div className="flex space-x-1">
                        <RiStarFill className="mt-1 size-4" /><RiStarFill className="mt-1 size-4" /><RiStarFill className="mt-1 size-4" /><RiStarFill className="mt-1 size-4" /><RiStarFill className="mt-1 size-4" /> 
                        <span className="ml-2">Excellent</span>
                    </div>
                </SelectItem>
            </Select>
            </div>
            <div className="col-span-full flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
              >
                Your feedback
                <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="feedback"
                name="feedback"
                placeholder="Your feedback"
                value={formData.feedback}
                onChange={handleChange}
                className={cx(
                    // base
                    "overflow-y-auto rounded-md border mt-2",
                    // border color
                    "border-gray-200 dark:border-gray-900",
                    // background color
                    "bg-white dark:bg-[#090E1A]",
                    focusRing,
                    )}
                required/>
            </div>
          </div>
          <Divider className="mt-8 border-t border-tremor-content dark:border-dark-tremor-content" />
          <div className="flex items-center justify-end space-x-4">
            <Button
                type="button"
                variant="secondary"
            >
              Cancel
            </Button>
            <Button
                type="submit"
                variant="primary"
            >
              Submit
            </Button>
          </div>
          {error && <div className="text-red-500 mt-2">{error}</div>}
        </form>
      </div>
    </>
  );
}