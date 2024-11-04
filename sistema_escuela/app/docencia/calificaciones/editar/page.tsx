'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { editGradeFormAction } from '@/app/utils/serverActions';
import { useFormState, useFormStatus } from 'react-dom';
import type { ExamGrade } from '@/app/utils/types';

export default function Page() {	
	const params = useSearchParams();
	const gradeID = params.get('gradeID') ?? "NO-ID?";
	const name = params.get('student_name') ?? "";
	const student_id = params.get('student_id') ?? "";
	const subject = params.get('subject') ?? "";
	const grade = params.get('grade') ?? "";
    const signed = params.get('signed') ?? "";

	return ( <section className="mt-2 flex content-center justify-center">
		<section className="flex flex-col justify-center max-w-md border border-black p-4 rounded">
			<h3>Editar calificación del alumno {name} de la materia {subject}</h3>
			<p> ID: { gradeID } </p>
			<form action={editGradeFormAction} className="flex flex-col">
				<input type="hidden" name="grade_id" value={gradeID} />
				<input type="hidden" name="student_id" value={student_id} />

				<label htmlFor="subject">Materia</label>
				<input required className="input input-bordered w-full max-w-xs"
					   type="text" name="subject" defaultValue={subject} id="subjectInput" />
				<div className="mt-4"></div>

                <label htmlFor="grade">Nota</label>
				<input required className="input input-bordered w-full max-w-xs"
					   type="text" name="grade" defaultValue={grade} id="gradeInput" />
				<div className="mt-4"></div>

                <label htmlFor="signed">Firmado</label>
				<input type="checkbox" name="signed" defaultChecked={signed == "true" ? true : false} id="signedInput" />
				<div className="mt-4"></div>

				<SubmitButton />
			</form>
		</section>
	</section>);
}

function SubmitButton() {
	const { pending } = useFormStatus();
	return <input disabled={pending} aria-disabled={pending} type="submit" value="Editar"
			className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" />;
}